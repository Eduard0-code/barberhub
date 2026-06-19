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

    @PutMapping("/{id}")
    public ResponseEntity<Barbeiro> atualizar(@PathVariable Integer id, @RequestBody Barbeiro dados) {
        Optional<Barbeiro> existente = repo.findById(id);
        if (existente.isEmpty()) return ResponseEntity.notFound().build();

        Barbeiro atual = existente.get();
        if (dados.getBarNome() != null) atual.setBarNome(dados.getBarNome());
        if (dados.getBarEmail() != null) atual.setBarEmail(dados.getBarEmail());
        if (dados.getBarTelefone() != null) atual.setBarTelefone(dados.getBarTelefone());
        if (dados.getBarEspecialidade() != null) atual.setBarEspecialidade(dados.getBarEspecialidade());
        if (dados.getBarAtivo() != null) atual.setBarAtivo(dados.getBarAtivo());
        if (dados.getBarSenha() != null && !dados.getBarSenha().isBlank()) {
            atual.setBarSenha(dados.getBarSenha());
        }
        return ResponseEntity.ok(repo.save(atual));
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
