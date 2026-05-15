## Arquivo .sql

-- Tabela Clientes: 
CREATE TABLE Clientes (
    CliCodigo INTEGER PRIMARY KEY,
    CliNome VARCHAR(50),
    CliEmail VARCHAR(100),
    CliTelefone VARCHAR(15),
    CliSenha VARCHAR(20),
    CliCriado DATETIME
);

-- Tabela Servico: 
CREATE TABLE Servico (
    SrvCodigo INTEGER PRIMARY KEY,
    SrvNome VARCHAR(100)
);

-- Tabela Configuracao_Agenda: 
CREATE TABLE Configuracao_Agenda (
    CfgCodigo INTEGER PRIMARY KEY,
    CfgDias VARCHAR(50),
    CfgHorarioInicio TIME,
    CfgHorarioFim TIME,
    CfgIntervalo INTEGER
);

-- Tabela Agendamento: 
CREATE TABLE Agendamento (
    AgdCodigo INTEGER PRIMARY KEY,
    CliCodigo INTEGER,
    SrvCodigo INTEGER,
    AgdData DATE,
    AgdHorario TIME,
    FOREIGN KEY (CliCodigo) REFERENCES Clientes(CliCodigo),
    FOREIGN KEY (SrvCodigo) REFERENCES Servico(SrvCodigo)
);