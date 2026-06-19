package com.barberhub.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Financeiro")
public class Financeiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FinCodigo")
    private Integer finCodigo;

    @Column(name = "AgdCodigo")
    private Integer agdCodigo;

    @Column(name = "FinValorPago")
    private BigDecimal finValorPago;

    @Column(name = "FinStatus")
    private String finStatus;

    @Column(name = "FinDataPagto")
    private LocalDate finDataPagto;

    public Integer getFinCodigo() { return finCodigo; }
    public void setFinCodigo(Integer finCodigo) { this.finCodigo = finCodigo; }

    public Integer getAgdCodigo() { return agdCodigo; }
    public void setAgdCodigo(Integer agdCodigo) { this.agdCodigo = agdCodigo; }

    public BigDecimal getFinValorPago() { return finValorPago; }
    public void setFinValorPago(BigDecimal finValorPago) { this.finValorPago = finValorPago; }

    public String getFinStatus() { return finStatus; }
    public void setFinStatus(String finStatus) { this.finStatus = finStatus; }

    public LocalDate getFinDataPagto() { return finDataPagto; }
    public void setFinDataPagto(LocalDate finDataPagto) { this.finDataPagto = finDataPagto; }
}
