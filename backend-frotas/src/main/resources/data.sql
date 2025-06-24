-- Inserir Administradores (3)
INSERT INTO usuarios (nome_completo, cpf, email, senha_hash, perfil, telefone, cep, rua, numero, bairro, cidade, estado, ativo) VALUES
('Lucas Admin', '11122233344', 'lucas.admin@frotas.com', '123:r6LRJNdWEvgxNbYdaVuDm4GbrAt04yS9f19mPiuhmPg=', 'ADMINISTRADOR', '41991234567', '80000000', 'Rua Alfa', '100', 'Centro', 'Curitiba', 'PR', TRUE),
('Amanda Admin', '22233344455', 'amanda.admin@frotas.com', '123:r6LRJNdWEvgxNbYdaVuDm4GbrAt04yS9f19mPiuhmPg=', 'ADMINISTRADOR', '41992345678', '80000000', 'Rua Beta', '200', 'Centro', 'Curitiba', 'PR', TRUE),
('Jorge Admin', '33344455566', 'jorge.admin@frotas.com', '123:r6LRJNdWEvgxNbYdaVuDm4GbrAt04yS9f19mPiuhmPg=', 'ADMINISTRADOR', '41993456789', '80000000', 'Rua Gama', '300', 'Centro', 'Curitiba', 'PR', TRUE);

-- Inserir Motoristas (5)
INSERT INTO usuarios (nome_completo, cpf, email, senha_hash, perfil, telefone, cep, rua, numero, bairro, cidade, estado, cnh, validade_cnh, ativo) VALUES
('Paulo Motorista', '44455566677', 'paulo.mot@frotas.com', '123:r6LRJNdWEvgxNbYdaVuDm4GbrAt04yS9f19mPiuhmPg=', 'MOTORISTA', '41994567890', '80000001', 'Av. Paraná', '10', 'Boa Vista', 'Curitiba', 'PR', '12345678901', '2028-12-31', TRUE),
('Carla Motorista', '55566677788', 'carla.mot@frotas.com', '123:r6LRJNdWEvgxNbYdaVuDm4GbrAt04yS9f19mPiuhmPg=', 'MOTORISTA', '41995678901', '80000002', 'Rua Sete de Setembro', '20', 'Centro', 'Curitiba', 'PR', '23456789012', '2027-11-30', TRUE),
('Roberta Motorista', '66677788899', 'roberta.mot@frotas.com', '$123:r6LRJNdWEvgxNbYdaVuDm4GbrAt04yS9f19mPiuhmPg=', 'MOTORISTA', '41996789012', '80000003', 'Rua das Flores', '30', 'Jardim Botânico', 'Curitiba', 'PR', '34567890123', '2029-10-15', TRUE),
('Diego Motorista', '77788899900', 'diego.mot@frotas.com', '123:r6LRJNdWEvgxNbYdaVuDm4GbrAt04yS9f19mPiuhmPg=', 'MOTORISTA', '41997890123', '80000004', 'Alameda Dr. Carlos de Carvalho', '40', 'Batel', 'Curitiba', 'PR', '45678901234', '2026-09-01', TRUE),
('Thiago Motorista', '88899900011', 'thiago.mot@frotas.com', '123:r6LRJNdWEvgxNbYdaVuDm4GbrAt04yS9f19mPiuhmPg=', 'MOTORISTA', '41998901234', '80000005', 'Rua XV de Novembro', '50', 'Centro', 'Curitiba', 'PR', '56789012345', '2030-08-20', TRUE);

-- Inserir Veículos (6)
INSERT INTO veiculos (placa, modelo, tipo, ano, quilometragem_atual, status, ativo) VALUES
('ABC1234', 'Furgão A - Mercedes-Benz Sprinter', 'VAN', 2020, 85000.50, 'DISPONIVEL', TRUE),
('DEF5678', 'Caminhonete B - Ford Ranger', 'CAMINHONETE', 2022, 42100.00, 'DISPONIVEL', TRUE),
('GHI9012', 'Van C - Fiat Ducato', 'VAN', 2019, 120000.75, 'EM_MANUTENCAO', TRUE),
('JKL3456', 'Carro D - Chevrolet Onix', 'CARRO', 2023, 15000.20, 'DISPONIVEL', TRUE),
('MNO7890', 'Caminhão E - Volvo FH', 'CAMINHAO', 2018, 250000.00, 'DISPONIVEL', TRUE),
('PQR1122', 'Furgão F - Renault Master', 'VAN', 2021, 60000.00, 'INATIVO', TRUE);

-- Inserir Agendamentos (10 - diferentes estados)
INSERT INTO agendamentos (veiculo_id, motorista_id, data_hora_saida, data_hora_retorno, destino, justificativa, quilometragem_saida, quilometragem_final, observacoes_saida, observacoes_final, status) VALUES
(1, 4, '2025-06-01 08:00:00', NULL, 'São Paulo', 'Entrega de materiais', 85000.50, NULL, 'Carga pesada', NULL, 'EM_USO'), -- EM USO
(2, 5, '2025-05-28 10:00:00', '2025-05-28 18:00:00', 'Rio de Janeiro', 'Visita a cliente', 42000.00, 43000.00, 'Viagem tranquila', 'Tudo ok', 'FINALIZADO'), -- FINALIZADO
(3, 6, '2025-06-05 14:00:00', NULL, 'Porto Alegre', 'Retirada de equipamento', NULL, NULL, NULL, NULL, 'AGENDADO'), -- AGENDADO
(4, 7, '2025-06-02 09:00:00', NULL, 'Belo Horizonte', 'Reunião comercial', NULL, NULL, NULL, NULL, 'PENDENTE'), -- PENDENTE
(5, 8, '2025-05-25 07:00:00', '2025-05-26 19:00:00', 'Brasília', 'Transporte de documentos', 249000.00, 251000.00, 'Demorou mais que o previsto', 'Documentos entregues', 'FINALIZADO'),
(1, 4, '2025-05-20 08:00:00', '2025-05-20 12:00:00', 'Curitiba', 'Rota local', 84000.00, 84500.00, NULL, NULL, 'FINALIZADO'),
(2, 6, '2025-06-10 11:00:00', NULL, 'Florianópolis', 'Suporte técnico', NULL, NULL, NULL, NULL, 'AGENDADO'),
(3, 7, '2025-05-15 09:00:00', '2025-05-15 11:00:00', 'Aeroporto', 'Transporte executivo', 119500.00, 119600.00, NULL, NULL, 'FINALIZADO'),
(4, 5, '2025-06-03 16:00:00', NULL, 'Ponta Grossa', 'Coleta de amostras', NULL, NULL, NULL, NULL, 'PENDENTE'),
(5, 8, '2025-05-10 09:00:00', '2025-05-10 17:00:00', 'Paranaguá', 'Entrega de carga', 248000.00, 248500.00, NULL, NULL, 'FINALIZADO');

-- Inserir Registros de Manutenção (3)
INSERT INTO manutencoes (veiculo_id, data_manutencao, tipo, descricao, valor, quilometragem_manutencao) VALUES
(3, '2025-05-29 09:00:00', 'CORRETIVA', 'Troca da bomba de combustível.', 850.50, 120000.75),
(1, '2025-05-18 14:00:00', 'PREVENTIVA', 'Troca de óleo e filtros.', 300.00, 84000.00),
(2, '2025-05-10 10:00:00', 'PREVENTIVA', 'Alinhamento e balanceamento.', 150.00, 40000.00);

-- Inserir Registros de Abastecimento (5)
INSERT INTO abastecimentos (veiculo_id, motorista_id, data_abastecimento, tipo_combustivel, valor, quilometragem_abastecimento) VALUES
(1, 4, '2025-05-30 16:00:00', 'DIESEL', 350.00, 85000.50),
(2, 5, '2025-05-28 09:00:00', 'GASOLINA', 200.00, 42000.00),
(4, 7, '2025-05-26 11:00:00', 'ETANOL', 180.00, 15000.00),
(5, 8, '2025-05-24 08:00:00', 'DIESEL', 400.00, 249000.00),
(1, 4, '2025-05-20 07:00:00', 'DIESEL', 250.00, 84000.00);
