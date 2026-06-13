package com.barberhub.repository;

import com.barberhub.entity.Barbeiro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BarbeiroRepository extends JpaRepository<Barbeiro, Integer> {
    Optional<Barbeiro> findByBarEmailAndBarSenha(String barEmail, String barSenha);
}
