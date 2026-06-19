package com.barberhub.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Material")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MatCodigo")
    private Integer matCodigo;

    @Column(name = "MatNome")
    private String matNome;

    @Column(name = "MatReferencia")
    private String matReferencia;

    @Column(name = "MatCategoria")
    private String matCategoria;

    @Column(name = "MatUnidade")
    private String matUnidade;

    @Column(name = "MatQuantidade")
    private BigDecimal matQuantidade;

    @Column(name = "MatQuantidadeMinima")
    private BigDecimal matQuantidadeMinima;

    public Integer getMatCodigo() { return matCodigo; }
    public void setMatCodigo(Integer matCodigo) { this.matCodigo = matCodigo; }

    public String getMatNome() { return matNome; }
    public void setMatNome(String matNome) { this.matNome = matNome; }

    public String getMatReferencia() { return matReferencia; }
    public void setMatReferencia(String matReferencia) { this.matReferencia = matReferencia; }

    public String getMatCategoria() { return matCategoria; }
    public void setMatCategoria(String matCategoria) { this.matCategoria = matCategoria; }

    public String getMatUnidade() { return matUnidade; }
    public void setMatUnidade(String matUnidade) { this.matUnidade = matUnidade; }

    public BigDecimal getMatQuantidade() { return matQuantidade; }
    public void setMatQuantidade(BigDecimal matQuantidade) { this.matQuantidade = matQuantidade; }

    public BigDecimal getMatQuantidadeMinima() { return matQuantidadeMinima; }
    public void setMatQuantidadeMinima(BigDecimal matQuantidadeMinima) { this.matQuantidadeMinima = matQuantidadeMinima; }
}
