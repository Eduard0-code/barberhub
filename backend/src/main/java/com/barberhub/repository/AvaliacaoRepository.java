package com.barberhub.repository;

import com.barberhub.entity.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Integer> {

    @Query("SELECT AVG(a.avaNota) FROM Avaliacao a")
    Double mediaDasNotas();

    Optional<Avaliacao> findByAgdCodigo(Integer agdCodigo);

    List<Avaliacao> findAllByOrderByAvaDataDesc();
}
