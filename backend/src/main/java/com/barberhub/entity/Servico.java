package com.barberhub.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Servico")
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SrvCodigo")
    private Integer srvCodigo;

    @Column(name = "SrvNome")
    private String srvNome;

    @Column(name = "SrvPreco")
    private BigDecimal srvPreco;

    public Integer getSrvCodigo() { return srvCodigo; }
    public void setSrvCodigo(Integer srvCodigo) { this.srvCodigo = srvCodigo; }

    public String getSrvNome() { return srvNome; }
    public void setSrvNome(String srvNome) { this.srvNome = srvNome; }

    public BigDecimal getSrvPreco() { return srvPreco; }
    public void setSrvPreco(BigDecimal srvPreco) { this.srvPreco = srvPreco; }
}
