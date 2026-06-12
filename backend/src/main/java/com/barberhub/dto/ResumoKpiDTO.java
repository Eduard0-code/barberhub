package com.barberhub.dto;

import java.math.BigDecimal;

public class ResumoKpiDTO {

    private BigDecimal faturamentoTotal;
    private BigDecimal ticketMedio;
    private Double avaliacaoMedia;
    private Double taxaCancelamento;

    public ResumoKpiDTO(BigDecimal faturamentoTotal, BigDecimal ticketMedio, Double avaliacaoMedia, Double taxaCancelamento) {
        this.faturamentoTotal = faturamentoTotal;
        this.ticketMedio = ticketMedio;
        this.avaliacaoMedia = avaliacaoMedia;
        this.taxaCancelamento = taxaCancelamento;
    }

    public BigDecimal getFaturamentoTotal() { return faturamentoTotal; }
    public BigDecimal getTicketMedio() { return ticketMedio; }
    public Double getAvaliacaoMedia() { return avaliacaoMedia; }
    public Double getTaxaCancelamento() { return taxaCancelamento; }
}
