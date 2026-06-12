package com.barberhub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CliCodigo")
    private Integer cliCodigo;

    @Column(name = "CliNome")
    private String cliNome;

    @Column(name = "CliEmail")
    private String cliEmail;

    @Column(name = "CliTelefone")
    private String cliTelefone;

    @Column(name = "CliSenha")
    private String cliSenha;

    @Column(name = "CliCriado")
    private LocalDateTime cliCriado;

    public Integer getCliCodigo() { return cliCodigo; }
    public void setCliCodigo(Integer cliCodigo) { this.cliCodigo = cliCodigo; }

    public String getCliNome() { return cliNome; }
    public void setCliNome(String cliNome) { this.cliNome = cliNome; }

    public String getCliEmail() { return cliEmail; }
    public void setCliEmail(String cliEmail) { this.cliEmail = cliEmail; }

    public String getCliTelefone() { return cliTelefone; }
    public void setCliTelefone(String cliTelefone) { this.cliTelefone = cliTelefone; }

    public String getCliSenha() { return cliSenha; }
    public void setCliSenha(String cliSenha) { this.cliSenha = cliSenha; }

    public LocalDateTime getCliCriado() { return cliCriado; }
    public void setCliCriado(LocalDateTime cliCriado) { this.cliCriado = cliCriado; }
}
