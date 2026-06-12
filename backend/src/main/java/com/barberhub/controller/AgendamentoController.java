package com.barberhub.controller;

import com.barberhub.entity.Agendamento;
import com.barberhub.entity.Financeiro;
import com.barberhub.entity.Servico;
import com.barberhub.repository.AgendamentoRepository;
import com.barberhub.repository.FinanceiroRepository;
import com.barberhub.repository.ServicoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    private final AgendamentoRepository repo;
    private final ServicoRepository servicoRepo;
    private final FinanceiroRepository financeiroRepo;

    public AgendamentoController(AgendamentoRepository repo,
                                 ServicoRepository servicoRepo,
                                 FinanceiroRepository financeiroRepo) {
        this.repo = repo;
        this.servicoRepo = servicoRepo;
        this.financeiroRepo = financeiroRepo;
    }

    @GetMapping
    public List<Agendamento> listar() {
        return repo.findAll();
    }

    @GetMapping("/recentes")
    public List<Agendamento> recentes() {
        return repo.findTop10ByOrderByAgdDataDescAgdHorarioDesc();
    }

    @GetMapping("/por-cliente/{cliCodigo}")
    public List<Agendamento> porCliente(@PathVariable Integer cliCodigo) {
        return repo.findByCliCodigoOrderByAgdDataDescAgdHorarioDesc(cliCodigo);
    }

    @PostMapping
    public ResponseEntity<Agendamento> criar(@RequestBody Agendamento agendamento) {
        if (agendamento.getAgdStatus() == null) {
            agendamento.setAgdStatus("Agendado");
        }

        if (agendamento.getAgdPreco() == null && agendamento.getSrvCodigo() != null) {
            Optional<Servico> servico = servicoRepo.findById(agendamento.getSrvCodigo());
            servico.ifPresent(s -> agendamento.setAgdPreco(s.getSrvPreco()));
        }

        Agendamento salvo = repo.save(agendamento);

        Financeiro fin = new Financeiro();
        fin.setAgdCodigo(salvo.getAgdCodigo());
        fin.setFinValorPago(salvo.getAgdPreco() != null ? salvo.getAgdPreco() : BigDecimal.ZERO);
        fin.setFinStatus("Pendente");
        fin.setFinDataPagto(salvo.getAgdData() != null ? salvo.getAgdData() : LocalDate.now());
        fin.setFinTicketMedio(salvo.getAgdPreco() != null ? salvo.getAgdPreco() : BigDecimal.ZERO);
        fin.setFinTotalRecebido(BigDecimal.ZERO);
        financeiroRepo.save(fin);

        return ResponseEntity.ok(salvo);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Agendamento> alterarStatus(@PathVariable Integer id, @RequestBody java.util.Map<String, String> dados) {
        Optional<Agendamento> agd = repo.findById(id);
        if (agd.isEmpty()) return ResponseEntity.notFound().build();

        Agendamento atual = agd.get();
        atual.setAgdStatus(dados.get("status"));
        return ResponseEntity.ok(repo.save(atual));
    }
}
