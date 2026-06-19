package com.barberhub.controller;

import com.barberhub.dto.PontoGraficoDTO;
import com.barberhub.dto.ResumoKpiDTO;
import com.barberhub.entity.Barbeiro;
import com.barberhub.entity.Servico;
import com.barberhub.repository.AgendamentoRepository;
import com.barberhub.repository.AvaliacaoRepository;
import com.barberhub.repository.BarbeiroRepository;
import com.barberhub.repository.FinanceiroRepository;
import com.barberhub.repository.ServicoRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/kpi")
public class KpiController {

    private final AgendamentoRepository agendamentoRepo;
    private final AvaliacaoRepository avaliacaoRepo;
    private final FinanceiroRepository financeiroRepo;
    private final BarbeiroRepository barbeiroRepo;
    private final ServicoRepository servicoRepo;

    public KpiController(AgendamentoRepository agendamentoRepo,
                         AvaliacaoRepository avaliacaoRepo,
                         FinanceiroRepository financeiroRepo,
                         BarbeiroRepository barbeiroRepo,
                         ServicoRepository servicoRepo) {
        this.agendamentoRepo = agendamentoRepo;
        this.avaliacaoRepo = avaliacaoRepo;
        this.financeiroRepo = financeiroRepo;
        this.barbeiroRepo = barbeiroRepo;
        this.servicoRepo = servicoRepo;
    }

    @GetMapping("/resumo")
    public ResumoKpiDTO resumo(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {

        BigDecimal faturamento = financeiroRepo.somaRecebidoPorPeriodo(inicio, fim);
        if (faturamento == null) faturamento = BigDecimal.ZERO;

        BigDecimal ticket = financeiroRepo.ticketMedioPorPeriodo(inicio, fim);
        if (ticket == null) ticket = BigDecimal.ZERO;
        ticket = ticket.setScale(2, RoundingMode.HALF_UP);

        LocalDateTime inicioDt = inicio != null ? inicio.atStartOfDay() : null;
        LocalDateTime fimDt = fim != null ? fim.atTime(LocalTime.MAX) : null;
        Double avaliacao = avaliacaoRepo.mediaDasNotasPorPeriodo(inicioDt, fimDt);
        if (avaliacao == null) avaliacao = 0.0;
        avaliacao = Math.round(avaliacao * 10.0) / 10.0;

        long total = agendamentoRepo.countPorPeriodo(inicio, fim);
        long cancelados = agendamentoRepo.countByStatusPorPeriodo("Cancelado", inicio, fim);
        double taxa = total == 0 ? 0.0 : (cancelados * 100.0) / total;
        taxa = Math.round(taxa * 10.0) / 10.0;

        return new ResumoKpiDTO(faturamento, ticket, avaliacao, taxa);
    }

    @GetMapping("/faturamento-por-dia")
    public List<PontoGraficoDTO> faturamentoPorDia(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        List<Object[]> linhas = financeiroRepo.faturamentoPorDia(inicio, fim);
        List<PontoGraficoDTO> resposta = new ArrayList<>();
        for (Object[] linha : linhas) {
            LocalDate data = (LocalDate) linha[0];
            BigDecimal valor = (BigDecimal) linha[1];
            resposta.add(new PontoGraficoDTO(data.toString(), valor));
        }
        return resposta;
    }

    @GetMapping("/atendimentos-por-barbeiro")
    public List<PontoGraficoDTO> atendimentosPorBarbeiro(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        Map<Integer, String> nomes = new HashMap<>();
        for (Barbeiro b : barbeiroRepo.findAll()) {
            nomes.put(b.getBarCodigo(), b.getBarNome());
        }

        List<PontoGraficoDTO> resposta = new ArrayList<>();
        for (Object[] linha : agendamentoRepo.countAgrupadoPorBarbeiroPorPeriodo(inicio, fim)) {
            Integer codigo = (Integer) linha[0];
            Long quantidade = (Long) linha[1];
            String nome = nomes.getOrDefault(codigo, "Barbeiro " + codigo);
            resposta.add(new PontoGraficoDTO(nome, quantidade));
        }
        return resposta;
    }

    @GetMapping("/servicos-mais-vendidos")
    public List<PontoGraficoDTO> servicosMaisVendidos(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        Map<Integer, String> nomes = new HashMap<>();
        for (Servico s : servicoRepo.findAll()) {
            nomes.put(s.getSrvCodigo(), s.getSrvNome());
        }

        List<PontoGraficoDTO> resposta = new ArrayList<>();
        for (Object[] linha : agendamentoRepo.countAgrupadoPorServicoPorPeriodo(inicio, fim)) {
            Integer codigo = (Integer) linha[0];
            Long quantidade = (Long) linha[1];
            String nome = nomes.getOrDefault(codigo, "Servico " + codigo);
            resposta.add(new PontoGraficoDTO(nome, quantidade));
        }
        return resposta;
    }

    @GetMapping("/ocupacao-barbeiros")
    public List<PontoGraficoDTO> ocupacaoBarbeiros(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        List<PontoGraficoDTO> resposta = new ArrayList<>();
        long totalGeral = agendamentoRepo.countPorPeriodo(inicio, fim);
        if (totalGeral == 0) return resposta;

        for (Barbeiro b : barbeiroRepo.findAll()) {
            long atendidos = agendamentoRepo.countByBarbeiroPorPeriodo(b.getBarCodigo(), inicio, fim);
            double percentual = (atendidos * 100.0) / totalGeral;
            percentual = Math.round(percentual * 10.0) / 10.0;
            resposta.add(new PontoGraficoDTO(b.getBarNome(), percentual));
        }
        return resposta;
    }
}
