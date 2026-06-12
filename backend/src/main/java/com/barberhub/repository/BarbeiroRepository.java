package com.barberhub.repository;

import com.barberhub.entity.Barbeiro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BarbeiroRepository extends JpaRepository<Barbeiro, Integer> {
}
