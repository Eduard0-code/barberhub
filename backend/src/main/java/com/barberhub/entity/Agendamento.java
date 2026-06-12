package com.barberhub.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Agendamento")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AgdCodigo")
    private Integer agdCodigo;

    @Column(name = "CliCodigo")
    private Integer cliCodigo;

    @Column(name = "BarCodigo")
    private Integer barCodigo;

    @Column(name = "SrvCodigo")
    private Integer srvCodigo;

    @Column(name = "AgdData")
    private LocalDate agdData;

    @Column(name = "AgdHorario")
    private LocalTime agdHorario;

    @Column(name = "AgdPreco")
    private BigDecimal agdPreco;

    @Column(name = "AgdStatus")
    private String agdStatus;

    public Integer getAgdCodigo() { return agdCodigo; }
    public void setAgdCodigo(Integer agdCodigo) { this.agdCodigo = agdCodigo; }

    public Integer getCliCodigo() { return cliCodigo; }
    public void setCliCodigo(Integer cliCodigo) { this.cliCodigo = cliCodigo; }

    public Integer getBarCodigo() { return barCodigo; }
    public void setBarCodigo(Integer barCodigo) { this.barCodigo = barCodigo; }

    public Integer getSrvCodigo() { return srvCodigo; }
    public void setSrvCodigo(Integer srvCodigo) { this.srvCodigo = srvCodigo; }

    public LocalDate getAgdData() { return agdData; }
    public void setAgdData(LocalDate agdData) { this.agdData = agdData; }

    public LocalTime getAgdHorario() { return agdHorario; }
    public void setAgdHorario(LocalTime agdHorario) { this.agdHorario = agdHorario; }

    public BigDecimal getAgdPreco() { return agdPreco; }
    public void setAgdPreco(BigDecimal agdPreco) { this.agdPreco = agdPreco; }

    public String getAgdStatus() { return agdStatus; }
    public void setAgdStatus(String agdStatus) { this.agdStatus = agdStatus; }
}
