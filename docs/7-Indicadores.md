## 7. Indicadores de desempenho e Relatórios

Nesta seção estão os principais indicadores definidos para acompanhar a operação da barbearia. Todas as informações usadas no cálculo dos indicadores estão presentes no modelo relacional do projeto.

### 7.1 Indicadores

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| --- | --- | --- | --- | --- |
| Faturamento por período | Acompanhar quanto a barbearia está recebendo no dia, na semana e no mês | Soma dos valores pagos pelos clientes no período escolhido | Tabela Financeiro | SUM(FinValorPago) agrupado por data |
| Ticket médio | Saber o valor médio gasto por cliente em cada atendimento | Média dos valores pagos por agendamento | Tabela Financeiro | SUM(FinValorPago) / COUNT(FinCodigo) |
| Taxa de ocupação dos barbeiros | Medir o quanto cada barbeiro está sendo aproveitado na agenda | Percentual de horários ocupados em relação aos horários disponíveis | Tabelas Agendamento e Configuracao_Agenda | (horários agendados / horários disponíveis) * 100 |
| Avaliação média dos serviços | Acompanhar a satisfação dos clientes com os atendimentos | Média das notas dadas pelos clientes nas avaliações | Tabela Avaliacao | AVG(AvaNota) |
| Taxa de cancelamento | Identificar quantos agendamentos estão sendo cancelados | Percentual de agendamentos cancelados em relação ao total | Tabela Agendamento | (COUNT agendamentos cancelados / COUNT total) * 100 |

### 7.2 Metas

| **Indicador** | **Meta** |
| --- | --- |
| Faturamento mensal | Crescimento de 10% em relação ao mês anterior |
| Ticket médio | Acima de R$ 55,00 |
| Taxa de ocupação | Acima de 70% por barbeiro |
| Avaliação média | Nota acima de 4,5 |
| Taxa de cancelamento | Abaixo de 10% |

### 7.3 Gráficos e Dashboards

Os indicadores são apresentados na tela de **Indicadores** da aplicação, disponível pelo menu lateral. A tela mostra cartões com os valores atuais de cada indicador e gráficos para visualizar a evolução ao longo do tempo.

Os gráficos utilizados são:

- Gráfico de linha para faturamento por dia da semana
- Gráfico de barras para comparar o desempenho dos barbeiros
- Gráfico de rosca para distribuição dos serviços vendidos
- Cartões numéricos para ticket médio, avaliação média e taxa de cancelamento

A página é atualizada com os dados do banco MySQL conforme os agendamentos, pagamentos e avaliações são registrados no sistema.
