package com.barberhub.controller;

import com.barberhub.entity.Servico;
import com.barberhub.repository.ServicoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/servicos")
public class ServicoController {

    private final ServicoRepository repo;

    public ServicoController(ServicoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Servico> listar() {
        return repo.findAll();
    }

    @PostMapping
    public ResponseEntity<Servico> criar(@RequestBody Servico servico) {
        return ResponseEntity.ok(repo.save(servico));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servico> atualizar(@PathVariable Integer id, @RequestBody Servico dados) {
        Optional<Servico> existente = repo.findById(id);
        if (existente.isEmpty()) return ResponseEntity.notFound().build();

        Servico atual = existente.get();
        if (dados.getSrvNome() != null) atual.setSrvNome(dados.getSrvNome());
        if (dados.getSrvPreco() != null) atual.setSrvPreco(dados.getSrvPreco());
        return ResponseEntity.ok(repo.save(atual));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Integer id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
