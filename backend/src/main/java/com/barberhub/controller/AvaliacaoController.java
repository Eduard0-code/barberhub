package com.barberhub.controller;

import com.barberhub.entity.Avaliacao;
import com.barberhub.repository.AvaliacaoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/avaliacoes")
public class AvaliacaoController {

    private final AvaliacaoRepository repo;

    public AvaliacaoController(AvaliacaoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Avaliacao> listar() {
        return repo.findAllByOrderByAvaDataDesc();
    }

    @GetMapping("/por-agendamento/{agdCodigo}")
    public ResponseEntity<Avaliacao> buscarPorAgendamento(@PathVariable Integer agdCodigo) {
        return repo.findByAgdCodigo(agdCodigo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Avaliacao avaliacao) {
        if (avaliacao.getAgdCodigo() == null) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Agendamento eh obrigatorio"));
        }
        if (avaliacao.getAvaNota() == null || avaliacao.getAvaNota() < 1 || avaliacao.getAvaNota() > 5) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Nota deve ser de 1 a 5"));
        }

        Optional<Avaliacao> existente = repo.findByAgdCodigo(avaliacao.getAgdCodigo());
        if (existente.isPresent()) {
            Avaliacao atual = existente.get();
            atual.setAvaNota(avaliacao.getAvaNota());
            atual.setAvaComentario(avaliacao.getAvaComentario());
            atual.setAvaData(LocalDateTime.now());
            return ResponseEntity.ok(repo.save(atual));
        }

        if (avaliacao.getAvaData() == null) {
            avaliacao.setAvaData(LocalDateTime.now());
        }
        return ResponseEntity.ok(repo.save(avaliacao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Integer id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
