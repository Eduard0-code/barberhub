package com.barberhub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Avaliacao")
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AvaCodigo")
    private Integer avaCodigo;

    @Column(name = "AgdCodigo", unique = true)
    private Integer agdCodigo;

    @Column(name = "AvaNota")
    private Integer avaNota;

    @Column(name = "AvaComentario")
    private String avaComentario;

    @Column(name = "AvaData")
    private LocalDateTime avaData;

    public Integer getAvaCodigo() { return avaCodigo; }
    public void setAvaCodigo(Integer avaCodigo) { this.avaCodigo = avaCodigo; }

    public Integer getAgdCodigo() { return agdCodigo; }
    public void setAgdCodigo(Integer agdCodigo) { this.agdCodigo = agdCodigo; }

    public Integer getAvaNota() { return avaNota; }
    public void setAvaNota(Integer avaNota) { this.avaNota = avaNota; }

    public String getAvaComentario() { return avaComentario; }
    public void setAvaComentario(String avaComentario) { this.avaComentario = avaComentario; }

    public LocalDateTime getAvaData() { return avaData; }
    public void setAvaData(LocalDateTime avaData) { this.avaData = avaData; }
}
