package com.barberhub.repository;

import com.barberhub.entity.MovimentacaoEstoque;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovimentacaoEstoqueRepository extends JpaRepository<MovimentacaoEstoque, Integer> {
    List<MovimentacaoEstoque> findTop20ByOrderByMovDataDesc();
    List<MovimentacaoEstoque> findByMatCodigoOrderByMovDataDesc(Integer matCodigo);
}
