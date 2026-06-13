package com.barberhub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Barbeiro")
public class Barbeiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BarCodigo")
    private Integer barCodigo;

    @Column(name = "BarNome")
    private String barNome;

    @Column(name = "BarTelefone")
    private String barTelefone;

    @Column(name = "BarEmail")
    private String barEmail;

    @Column(name = "BarEspecialidade")
    private String barEspecialidade;

    @Column(name = "BarSenha")
    private String barSenha;

    @Column(name = "BarAtivo")
    private Boolean barAtivo;

    public Integer getBarCodigo() { return barCodigo; }
    public void setBarCodigo(Integer barCodigo) { this.barCodigo = barCodigo; }

    public String getBarNome() { return barNome; }
    public void setBarNome(String barNome) { this.barNome = barNome; }

    public String getBarTelefone() { return barTelefone; }
    public void setBarTelefone(String barTelefone) { this.barTelefone = barTelefone; }

    public String getBarEmail() { return barEmail; }
    public void setBarEmail(String barEmail) { this.barEmail = barEmail; }

    public String getBarEspecialidade() { return barEspecialidade; }
    public void setBarEspecialidade(String barEspecialidade) { this.barEspecialidade = barEspecialidade; }

    public String getBarSenha() { return barSenha; }
    public void setBarSenha(String barSenha) { this.barSenha = barSenha; }

    public Boolean getBarAtivo() { return barAtivo; }
    public void setBarAtivo(Boolean barAtivo) { this.barAtivo = barAtivo; }
}
