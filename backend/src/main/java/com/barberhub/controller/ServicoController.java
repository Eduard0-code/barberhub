package com.barberhub.controller;

import com.barberhub.entity.Servico;
import com.barberhub.repository.ServicoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
