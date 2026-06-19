package com.barberhub.repository;

import com.barberhub.entity.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {

    long countByAgdStatus(String status);

    List<Agendamento> findByBarCodigoOrderByAgdDataDescAgdHorarioDesc(Integer barCodigo);

    List<Agendamento> findByBarCodigoAndAgdData(Integer barCodigo, LocalDate agdData);

    List<Agendamento> findByBarCodigoAndAgdDataAndAgdHorario(Integer barCodigo, LocalDate agdData, LocalTime agdHorario);

    @Query("SELECT COUNT(a) FROM Agendamento a WHERE a.barCodigo = :barCodigo")
    long countByBarbeiro(Integer barCodigo);

    @Query("SELECT a.srvCodigo, COUNT(a) FROM Agendamento a GROUP BY a.srvCodigo")
    List<Object[]> countAgrupadoPorServico();

    @Query("SELECT a.barCodigo, COUNT(a) FROM Agendamento a GROUP BY a.barCodigo")
    List<Object[]> countAgrupadoPorBarbeiro();

    @Query("SELECT COUNT(a) FROM Agendamento a WHERE " +
            "(:inicio IS NULL OR a.agdData >= :inicio) AND (:fim IS NULL OR a.agdData <= :fim)")
    long countPorPeriodo(@Param("inicio") LocalDate inicio, @Param("fim") LocalDate fim);

    @Query("SELECT COUNT(a) FROM Agendamento a WHERE a.agdStatus = :status AND " +
            "(:inicio IS NULL OR a.agdData >= :inicio) AND (:fim IS NULL OR a.agdData <= :fim)")
    long countByStatusPorPeriodo(@Param("status") String status,
                                 @Param("inicio") LocalDate inicio, @Param("fim") LocalDate fim);

    @Query("SELECT COUNT(a) FROM Agendamento a WHERE a.barCodigo = :barCodigo AND " +
            "(:inicio IS NULL OR a.agdData >= :inicio) AND (:fim IS NULL OR a.agdData <= :fim)")
    long countByBarbeiroPorPeriodo(@Param("barCodigo") Integer barCodigo,
                                   @Param("inicio") LocalDate inicio, @Param("fim") LocalDate fim);

    @Query("SELECT a.srvCodigo, COUNT(a) FROM Agendamento a WHERE " +
            "(:inicio IS NULL OR a.agdData >= :inicio) AND (:fim IS NULL OR a.agdData <= :fim) " +
            "GROUP BY a.srvCodigo")
    List<Object[]> countAgrupadoPorServicoPorPeriodo(@Param("inicio") LocalDate inicio, @Param("fim") LocalDate fim);

    @Query("SELECT a.barCodigo, COUNT(a) FROM Agendamento a WHERE " +
            "(:inicio IS NULL OR a.agdData >= :inicio) AND (:fim IS NULL OR a.agdData <= :fim) " +
            "GROUP BY a.barCodigo")
    List<Object[]> countAgrupadoPorBarbeiroPorPeriodo(@Param("inicio") LocalDate inicio, @Param("fim") LocalDate fim);

    List<Agendamento> findTop10ByOrderByAgdDataDescAgdHorarioDesc();

    List<Agendamento> findByCliCodigoOrderByAgdDataDescAgdHorarioDesc(Integer cliCodigo);
}
