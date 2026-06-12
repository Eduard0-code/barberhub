package com.barberhub.repository;

import com.barberhub.entity.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {

    long countByAgdStatus(String status);

    @Query("SELECT COUNT(a) FROM Agendamento a WHERE a.barCodigo = :barCodigo")
    long countByBarbeiro(Integer barCodigo);

    @Query("SELECT a.srvCodigo, COUNT(a) FROM Agendamento a GROUP BY a.srvCodigo")
    List<Object[]> countAgrupadoPorServico();

    @Query("SELECT a.barCodigo, COUNT(a) FROM Agendamento a GROUP BY a.barCodigo")
    List<Object[]> countAgrupadoPorBarbeiro();

    List<Agendamento> findTop10ByOrderByAgdDataDescAgdHorarioDesc();

    List<Agendamento> findByCliCodigoOrderByAgdDataDescAgdHorarioDesc(Integer cliCodigo);
}
