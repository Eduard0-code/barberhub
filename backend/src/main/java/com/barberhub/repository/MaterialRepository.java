package com.barberhub.repository;

import com.barberhub.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Integer> {
    List<Material> findAllByOrderByMatNomeAsc();
}
