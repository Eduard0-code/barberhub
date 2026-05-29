## Arquivo .sql

-- Tabela de Clientes
CREATE TABLE Clientes (
    CliCodigo INTEGER PRIMARY KEY,
    CliNome VARCHAR(50),
    CliEmail VARCHAR(100),
    CliTelefone VARCHAR(15),
    CliSenha VARCHAR(20),
    CliCriado DATETIME
);

-- Tabela de Barbeiros
CREATE TABLE Barbeiro (
    BarCodigo INTEGER PRIMARY KEY,
    BarNome VARCHAR(50),
    BarTelefone VARCHAR(15),
    BarEmail VARCHAR(100),
    BarEspecialidade VARCHAR(100),
    BarAtivo BOOLEAN
);

-- Tabela de Serviços
CREATE TABLE Servico (
    SrvCodigo INTEGER PRIMARY KEY,
    SrvNome VARCHAR(100),
    SrvPreco DECIMAL(10,2)
);

-- Tabela de Regras de Agenda
CREATE TABLE Configuracao_Agenda (
    CfgCodigo INTEGER PRIMARY KEY,
    BarCodigo INTEGER,
    CfgDias VARCHAR(50),
    CfgHorarioInicio TIME,
    CfgHorarioFim TIME,
    CfgIntervalo INTEGER,
    FOREIGN KEY (BarCodigo) REFERENCES Barbeiro(BarCodigo)
);

-- Tabela de Agendamentos
CREATE TABLE Agendamento (
    AgdCodigo INTEGER PRIMARY KEY,
    CliCodigo INTEGER,
    BarCodigo INTEGER,
    SrvCodigo INTEGER,
    AgdData DATE,
    AgdHorario TIME,
    AgdPreco DECIMAL(10,2),
    AgdStatus VARCHAR(20),
    FOREIGN KEY (CliCodigo) REFERENCES Clientes(CliCodigo),
    FOREIGN KEY (BarCodigo) REFERENCES Barbeiro(BarCodigo),
    FOREIGN KEY (SrvCodigo) REFERENCES Servico(SrvCodigo)
);

-- Tabela de Avaliação de Serviço
CREATE TABLE Avaliacao (
    AvaCodigo INTEGER PRIMARY KEY,
    AgdCodigo INTEGER UNIQUE, -- Garante que cada agendamento receba apenas uma avaliação
    AvaNota INTEGER,
    AvaComentario VARCHAR(500),
    AvaData DATETIME,
    FOREIGN KEY (AgdCodigo) REFERENCES Agendamento(AgdCodigo)
);