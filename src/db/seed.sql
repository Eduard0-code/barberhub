USE db_barbearia;

INSERT INTO Clientes (CliNome, CliEmail, CliTelefone, CliSenha, CliCriado) VALUES
('Joao Silva', 'joao@email.com', '31988887777', 'senha123', NOW()),
('Marcos Pereira', 'marcos@email.com', '31988886666', 'senha123', NOW()),
('Carlos Eduardo', 'carlos@email.com', '31988885555', 'senha123', NOW()),
('Felipe Santos', 'felipe@email.com', '31988884444', 'senha123', NOW()),
('Andre Lima', 'andre@email.com', '31988883333', 'senha123', NOW());

INSERT INTO Barbeiro (BarNome, BarTelefone, BarEmail, BarEspecialidade, BarSenha, BarAtivo) VALUES
('Rafael Souza', '31999990001', 'rafael@barberhub.com', 'Corte e Barba', 'senha123', TRUE),
('Lucas Mendes', '31999990002', 'lucas@barberhub.com', 'Corte Infantil', 'senha123', TRUE),
('Pedro Alves', '31999990003', 'pedro@barberhub.com', 'Barba e Sobrancelha', 'senha123', TRUE);

INSERT INTO Servico (SrvNome, SrvPreco) VALUES
('Corte de Cabelo', 45.00),
('Barba Completa', 35.00),
('Corte + Barba', 70.00),
('Sobrancelha', 15.00),
('Corte + Pigmentacao', 80.00);

INSERT INTO Configuracao_Agenda (BarCodigo, CfgDias, CfgHorarioInicio, CfgHorarioFim, CfgIntervalo) VALUES
(1, 'Seg,Ter,Qua,Qui,Sex,Sab', '09:00:00', '19:00:00', 30),
(2, 'Seg,Ter,Qua,Qui,Sex', '10:00:00', '18:00:00', 30),
(3, 'Ter,Qua,Qui,Sex,Sab', '09:00:00', '20:00:00', 30);

INSERT INTO Agendamento (CliCodigo, BarCodigo, SrvCodigo, AgdData, AgdHorario, AgdPreco, AgdStatus) VALUES
(1, 1, 3, CURDATE(), '14:30:00', 70.00, 'Concluido'),
(2, 1, 1, CURDATE(), '13:00:00', 45.00, 'Concluido'),
(3, 2, 2, CURDATE(), '11:45:00', 35.00, 'Concluido'),
(4, 1, 5, CURDATE(), '10:30:00', 80.00, 'Concluido'),
(5, 3, 1, CURDATE(), '15:30:00', 45.00, 'Agendado'),
(1, 2, 1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), '10:00:00', 45.00, 'Concluido'),
(2, 3, 3, DATE_SUB(CURDATE(), INTERVAL 2 DAY), '16:00:00', 70.00, 'Concluido'),
(3, 1, 4, DATE_SUB(CURDATE(), INTERVAL 3 DAY), '09:30:00', 15.00, 'Concluido'),
(4, 2, 2, DATE_SUB(CURDATE(), INTERVAL 4 DAY), '14:00:00', 35.00, 'Cancelado'),
(5, 1, 1, DATE_SUB(CURDATE(), INTERVAL 5 DAY), '11:00:00', 45.00, 'Concluido'),
(1, 3, 5, DATE_SUB(CURDATE(), INTERVAL 6 DAY), '17:00:00', 80.00, 'Concluido'),
(2, 2, 3, DATE_SUB(CURDATE(), INTERVAL 7 DAY), '12:00:00', 70.00, 'Concluido');

INSERT INTO Avaliacao (AgdCodigo, AvaNota, AvaComentario, AvaData) VALUES
(1, 5, 'Otimo atendimento', NOW()),
(2, 4, 'Gostei do corte', NOW()),
(3, 5, 'Barba ficou perfeita', NOW()),
(4, 5, 'Profissional caprichou', NOW()),
(6, 4, 'Bom servico', NOW()),
(7, 5, 'Recomendo', NOW()),
(8, 3, 'Atendimento regular', NOW()),
(10, 5, 'Voltarei mais vezes', NOW()),
(11, 4, 'Bom resultado', NOW()),
(12, 5, 'Excelente', NOW());

INSERT INTO Financeiro (AgdCodigo, FinValorPago, FinStatus, FinDataPagto, FinTicketMedio, FinTotalRecebido) VALUES
(1, 70.00, 'Pago', CURDATE(), 56.66, 450.00),
(2, 45.00, 'Pago', CURDATE(), 56.66, 450.00),
(3, 35.00, 'Pago', CURDATE(), 56.66, 450.00),
(4, 80.00, 'Pago', CURDATE(), 56.66, 450.00),
(6, 45.00, 'Pago', DATE_SUB(CURDATE(), INTERVAL 1 DAY), 55.00, 380.00),
(7, 70.00, 'Pago', DATE_SUB(CURDATE(), INTERVAL 2 DAY), 55.00, 380.00),
(8, 15.00, 'Pago', DATE_SUB(CURDATE(), INTERVAL 3 DAY), 55.00, 380.00),
(10, 45.00, 'Pago', DATE_SUB(CURDATE(), INTERVAL 5 DAY), 60.00, 420.00),
(11, 80.00, 'Pago', DATE_SUB(CURDATE(), INTERVAL 6 DAY), 60.00, 420.00),
(12, 70.00, 'Pago', DATE_SUB(CURDATE(), INTERVAL 7 DAY), 60.00, 420.00);
