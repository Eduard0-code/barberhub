package com.barberhub.repository;

import com.barberhub.entity.ConfiguracaoAgenda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConfiguracaoAgendaRepository extends JpaRepository<ConfiguracaoAgenda, Integer> {
    Optional<ConfiguracaoAgenda> findByBarCodigo(Integer barCodigo);
}
