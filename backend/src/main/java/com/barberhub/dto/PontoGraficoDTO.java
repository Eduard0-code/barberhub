package com.barberhub.dto;

public class PontoGraficoDTO {

    private String rotulo;
    private Number valor;

    public PontoGraficoDTO(String rotulo, Number valor) {
        this.rotulo = rotulo;
        this.valor = valor;
    }

    public String getRotulo() { return rotulo; }
    public Number getValor() { return valor; }
}
