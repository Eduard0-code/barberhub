package com.barberhub.repository;

import com.barberhub.entity.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Integer> {

    @Query("SELECT AVG(a.avaNota) FROM Avaliacao a")
    Double mediaDasNotas();

    @Query("SELECT AVG(a.avaNota) FROM Avaliacao a WHERE " +
            "(:inicio IS NULL OR a.avaData >= :inicio) AND (:fim IS NULL OR a.avaData <= :fim)")
    Double mediaDasNotasPorPeriodo(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);

    Optional<Avaliacao> findByAgdCodigo(Integer agdCodigo);

    List<Avaliacao> findAllByOrderByAvaDataDesc();
}
