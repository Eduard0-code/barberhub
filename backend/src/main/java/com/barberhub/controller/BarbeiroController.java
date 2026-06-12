package com.barberhub.controller;

import com.barberhub.entity.Barbeiro;
import com.barberhub.repository.BarbeiroRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/barbeiros")
public class BarbeiroController {

    private final BarbeiroRepository repo;

    public BarbeiroController(BarbeiroRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Barbeiro> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barbeiro> buscar(@PathVariable Integer id) {
        Optional<Barbeiro> barbeiro = repo.findById(id);
        return barbeiro.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Barbeiro> criar(@RequestBody Barbeiro barbeiro) {
        if (barbeiro.getBarAtivo() == null) {
            barbeiro.setBarAtivo(true);
        }
        Barbeiro salvo = repo.save(barbeiro);
        return ResponseEntity.ok(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Integer id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
