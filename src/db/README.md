## Arquivo .sql

Adicione aqui os scripts SQL.-- Criação da tabela Clientes
CREATE TABLE Clientes (
    CliCodigo     INTEGER       PRIMARY KEY,
    CliNome       VARCHAR(50),
    CliEmail      VARCHAR(100),
    CliTelefone   VARCHAR(15),
    CliSenha      VARCHAR(20),
    CliCriado     DATETIME
);
