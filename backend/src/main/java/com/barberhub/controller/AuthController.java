package com.barberhub.controller;

import com.barberhub.entity.Barbeiro;
import com.barberhub.entity.Cliente;
import com.barberhub.repository.BarbeiroRepository;
import com.barberhub.repository.ClienteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final ClienteRepository clienteRepo;
    private final BarbeiroRepository barbeiroRepo;

    public AuthController(ClienteRepository clienteRepo, BarbeiroRepository barbeiroRepo) {
        this.clienteRepo = clienteRepo;
        this.barbeiroRepo = barbeiroRepo;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> dados) {
        String email = dados.get("email");
        String senha = dados.get("senha");

        if (email == null || senha == null) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Email e senha sao obrigatorios"));
        }

        Optional<Cliente> cliente = clienteRepo.findByCliEmailAndCliSenha(email, senha);
        if (cliente.isPresent()) {
            return ResponseEntity.ok(cliente.get());
        }

        Optional<Barbeiro> barbeiro = barbeiroRepo.findByBarEmailAndBarSenha(email, senha);
        if (barbeiro.isPresent()) {
            return ResponseEntity.ok(barbeiro.get());
        }

        return ResponseEntity.status(401).body(Map.of("erro", "Email ou senha invalidos"));
    }
}
