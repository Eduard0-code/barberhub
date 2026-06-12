package com.barberhub.repository;

import com.barberhub.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    Optional<Cliente> findByCliEmailAndCliSenha(String cliEmail, String cliSenha);
    Optional<Cliente> findByCliEmail(String cliEmail);
}
