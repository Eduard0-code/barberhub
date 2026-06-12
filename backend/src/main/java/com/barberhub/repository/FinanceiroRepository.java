package com.barberhub.repository;

import com.barberhub.entity.Financeiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface FinanceiroRepository extends JpaRepository<Financeiro, Integer> {

    @Query("SELECT SUM(f.finValorPago) FROM Financeiro f")
    BigDecimal somaTotalRecebido();

    @Query("SELECT AVG(f.finValorPago) FROM Financeiro f")
    BigDecimal ticketMedio();

    @Query("SELECT f.finDataPagto, SUM(f.finValorPago) FROM Financeiro f GROUP BY f.finDataPagto ORDER BY f.finDataPagto")
    List<Object[]> faturamentoPorDia();

    List<Financeiro> findTop15ByOrderByFinDataPagtoDesc();

    @Query("SELECT COUNT(f) FROM Financeiro f WHERE f.finStatus = :status")
    long countPorStatus(String status);

    @Query("SELECT SUM(f.finValorPago) FROM Financeiro f WHERE f.finDataPagto = :data")
    java.math.BigDecimal somaPorData(java.time.LocalDate data);
}
