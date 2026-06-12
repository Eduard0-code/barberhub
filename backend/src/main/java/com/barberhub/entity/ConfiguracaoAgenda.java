package com.barberhub.entity;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "Configuracao_Agenda")
public class ConfiguracaoAgenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CfgCodigo")
    private Integer cfgCodigo;

    @Column(name = "BarCodigo")
    private Integer barCodigo;

    @Column(name = "CfgDias")
    private String cfgDias;

    @Column(name = "CfgHorarioInicio")
    private LocalTime cfgHorarioInicio;

    @Column(name = "CfgHorarioFim")
    private LocalTime cfgHorarioFim;

    @Column(name = "CfgIntervalo")
    private Integer cfgIntervalo;

    public Integer getCfgCodigo() { return cfgCodigo; }
    public void setCfgCodigo(Integer cfgCodigo) { this.cfgCodigo = cfgCodigo; }

    public Integer getBarCodigo() { return barCodigo; }
    public void setBarCodigo(Integer barCodigo) { this.barCodigo = barCodigo; }

    public String getCfgDias() { return cfgDias; }
    public void setCfgDias(String cfgDias) { this.cfgDias = cfgDias; }

    public LocalTime getCfgHorarioInicio() { return cfgHorarioInicio; }
    public void setCfgHorarioInicio(LocalTime cfgHorarioInicio) { this.cfgHorarioInicio = cfgHorarioInicio; }

    public LocalTime getCfgHorarioFim() { return cfgHorarioFim; }
    public void setCfgHorarioFim(LocalTime cfgHorarioFim) { this.cfgHorarioFim = cfgHorarioFim; }

    public Integer getCfgIntervalo() { return cfgIntervalo; }
    public void setCfgIntervalo(Integer cfgIntervalo) { this.cfgIntervalo = cfgIntervalo; }
}
