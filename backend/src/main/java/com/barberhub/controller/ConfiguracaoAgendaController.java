package com.barberhub.controller;

import com.barberhub.entity.ConfiguracaoAgenda;
import com.barberhub.repository.ConfiguracaoAgendaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/configuracao-agenda")
public class ConfiguracaoAgendaController {

    private final ConfiguracaoAgendaRepository repo;

    public ConfiguracaoAgendaController(ConfiguracaoAgendaRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<ConfiguracaoAgenda> listar() {
        return repo.findAll();
    }

    @GetMapping("/barbeiro/{barCodigo}")
    public ResponseEntity<ConfiguracaoAgenda> porBarbeiro(@PathVariable Integer barCodigo) {
        return repo.findByBarCodigo(barCodigo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ConfiguracaoAgenda> salvar(@RequestBody ConfiguracaoAgenda cfg) {
        if (cfg.getBarCodigo() == null) {
            return ResponseEntity.badRequest().build();
        }
        Optional<ConfiguracaoAgenda> existente = repo.findByBarCodigo(cfg.getBarCodigo());
        if (existente.isPresent()) {
            ConfiguracaoAgenda atual = existente.get();
            atual.setCfgDias(cfg.getCfgDias());
            atual.setCfgHorarioInicio(cfg.getCfgHorarioInicio());
            atual.setCfgHorarioFim(cfg.getCfgHorarioFim());
            atual.setCfgIntervalo(cfg.getCfgIntervalo());
            return ResponseEntity.ok(repo.save(atual));
        }
        return ResponseEntity.ok(repo.save(cfg));
    }
}
