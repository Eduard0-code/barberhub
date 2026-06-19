package com.barberhub.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Movimentacao_Estoque")
public class MovimentacaoEstoque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MovCodigo")
    private Integer movCodigo;

    @Column(name = "MatCodigo")
    private Integer matCodigo;

    /** "Uso" (baixa) ou "Reposicao" (entrada). */
    @Column(name = "MovTipo")
    private String movTipo;

    @Column(name = "MovQuantidade")
    private BigDecimal movQuantidade;

    @Column(name = "MovObservacao")
    private String movObservacao;

    @Column(name = "MovFornecedor")
    private String movFornecedor;

    @Column(name = "MovCusto")
    private BigDecimal movCusto;

    @Column(name = "MovData")
    private LocalDateTime movData;

    public Integer getMovCodigo() { return movCodigo; }
    public void setMovCodigo(Integer movCodigo) { this.movCodigo = movCodigo; }

    public Integer getMatCodigo() { return matCodigo; }
    public void setMatCodigo(Integer matCodigo) { this.matCodigo = matCodigo; }

    public String getMovTipo() { return movTipo; }
    public void setMovTipo(String movTipo) { this.movTipo = movTipo; }

    public BigDecimal getMovQuantidade() { return movQuantidade; }
    public void setMovQuantidade(BigDecimal movQuantidade) { this.movQuantidade = movQuantidade; }

    public String getMovObservacao() { return movObservacao; }
    public void setMovObservacao(String movObservacao) { this.movObservacao = movObservacao; }

    public String getMovFornecedor() { return movFornecedor; }
    public void setMovFornecedor(String movFornecedor) { this.movFornecedor = movFornecedor; }

    public BigDecimal getMovCusto() { return movCusto; }
    public void setMovCusto(BigDecimal movCusto) { this.movCusto = movCusto; }

    public LocalDateTime getMovData() { return movData; }
    public void setMovData(LocalDateTime movData) { this.movData = movData; }
}
