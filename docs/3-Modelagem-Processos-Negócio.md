## 3. Modelagem dos Processos de Negócio


> **Links Úteis**:
> - [Modelagem de Processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 Dicas Práticas de Modelagem de Processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

### 3.1. Modelagem da situação atual (Modelagem AS IS)

Atualmente, a barbearia de Roberto funciona de forma manual e desorganizada. Os agendamentos são feitos principalmente por mensagens no WhatsApp ou anotações em caderno.

Roberto precisa interromper constantemente seus atendimentos para responder clientes, o que prejudica sua produtividade. Além disso, não há controle eficiente dos horários, o que gera conflitos, atrasos e clientes faltosos.

Do ponto de vista do cliente (Lucas), não existe um sistema claro para visualizar horários disponíveis, nem garantia de pontualidade, dificultando o planejamento de compromissos importantes.

**Principais problemas** 
* Agendamentos feitos manualmente
* Falta de visualização de horários disponíveis
* Interrupções constantes no trabalho do barbeiro
* Falta de confirmação automática
* Clientes esquecem horários
* Ausência de controle financeiro estruturado
* Falta de controle de estoque
* Falta de registro de avaliações

### 3.2. Descrição geral da proposta (Modelagem TO BE)

Com a implementação do sistema, Lucas poderá acessar a plataforma, visualizar horários disponíveis em tempo real, escolher serviços com duração definida e agendar seu atendimento com segurança e pontualidade.

Roberto poderá definir seus horários de funcionamento, visualizar todos os agendamentos do dia em uma única tela e reduzir interrupções durante o trabalho. O sistema também permitirá o envio de lembretes automáticos, reduzindo faltas de clientes.

Além disso, o sistema integrará funcionalidades de controle financeiro, avaliações de serviços e gestão de estoque, centralizando todas as operações da barbearia.

**Melhorias**
* Agendamento online automatizado
* Visualização de horários em tempo real
* Redução de interrupções para Roberto
* Envio de notificações e lembretes
* Controle financeiro básico
* Registro de avaliações
* Controle de estoque
* Histórico de clientes

### 3.3. Modelagem dos processos

#### 3.3.1 Processo 1 - (Gestão do Cadastro do Cliente) 
O processo de cadastro de cliente tem como objetivo registrar as informações dos clientes no sistema da barbearia, permitindo sua identificação e utilização em agendamentos futuros.

Atualmente (AS IS), esse processo não é estruturado, sendo realizado de forma informal por meio de conversas no WhatsApp, o que dificulta a organização e o histórico de clientes.

Na proposta (TO BE), o sistema permitirá que o próprio cliente (Lucas) realize seu cadastro de forma autônoma, garantindo organização, rapidez e melhor experiência. Isso também reduz o tempo que Roberto gasta coletando dados manualmente.

##### 3.3.1.1  Modelagem BPMN
![`ProcessodeGestãodeCadastrodeClienteDiagrama`](images/ProcessodeGestãodeCadastrodeClienteDiagrama.png)
##### 3.3.1.2  Detalhamento das atividades do usuário (user tasks)

Os tipos de dados utilizados no processo são:

* Área de texto: campo de texto de múltiplas linhas
* Caixa de texto: campo de texto de uma linha
* Número: campo numérico
* Data: campo do tipo data (dd-mm-aaaa)
* Hora: campo do tipo hora (hh:mm:ss)
* Data e Hora: campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)
* Imagem: campo contendo uma imagem
* Seleção única: campo com opções mutuamente exclusivas
* Seleção múltipla: campo com múltiplas opções selecionáveis
* Arquivo: campo para upload de documentos
* Link: campo para armazenar URL

**Acessar tela de cadastro 1**
| **Campo**         | **Tipo**       | **Restrições**      | **Valor default** |
| ---------------   | --------       | --------------      | ----------------- |
| email             | Caixa de texto | formato de e-mail   | joao@exemplo.com  |
| senha             | Caixa de texto | mínimo 8 caracteres | ********          |
| botão login       | Link           | obrigatório         | -                 |
| botão cadastro    | Link           | obrigatório         | -                 |

| **Comandos** | **Destino**                | **Tipo** |
| ------------ | -------------------------- | -------- |
| login        | Homepage                   | link     |
| cadastrar    | Preencher dados do cliente | link     |

**Preencher dados do cliente 2**
| **Campo**      | **Tipo**       | **Restrições**      | **Valor default** |
| ---------      | -------------- | ------------------- | ----------------- |
| nome           | Caixa de texto | obrigatório         | Ex: João da Silva |
| telefone       | Caixa de texto | formato válido      |  (31) 99999-9999  |
| email          | Caixa de texto | formato de e-mail   | joao@exemplo.com  |
| senha          | Caixa de texto | mínimo 8 caracteres | ********          |
| botão cadastrar| Link           | -                   | -                 |
| botão cancelar | cancel         | -                   | -                 |

| **Comandos** | **Destino**     | **Tipo** |
| ------------ | --------------- | -------- |
| cadastrar    | Fim do processo | link     |
| cancelar     | Tela de login   | cancel   |

**Validar dados 3**
| **Campo** | **Tipo** | **Restrições**                  | **Valor default** |
| --------- | -------- | ------------------------------- | ----------------- |
| validação | Sistema  | campos obrigatórios preenchidos | automático        |

| **Comandos** | **Destino**     | **Tipo** |
| ------------ | --------------- | -------- |
| válido       | Salvar cadastro | default  |
| inválido     | Corrigir dados  | cancel   |

**Salvar Cadastro 4**
| **Campo**    | **Tipo**       | **Restrições** | **Valor default** |
| ---------    | -------------- | -------------- | ----------------- |
| nome         | Caixa de texto | obrigatório    | automático        |
| telefone     | Caixa de texto | obrigatório    | automático        |
| email        | Caixa de texto | obrigatório    | automático        |
| senha        | Caixa de texto | obrigatório    | automático        |

| **Comandos** | **Destino**        | **Tipo** |
| ------------ | ------------------ | -------- |
| concluir     | Enviar confirmação | default  |

**Enviar confirmação 5**
| **Campo** | **Tipo**      | **Restrições** | **Valor default** |
| --------- | ------------- | -------------- | ----------------- |
| mensagem  | Área de texto | obrigatório    | automático        |

| **Comandos** | **Destino**     | **Tipo** |
| ------------ | --------------- | -------- |
| finalizar    | Fim do processo | default  |

**Corrigir Dados 6**
| **Campo** | **Tipo**      | **Restrições** | **Valor default** |
| --------- | ------------- | -------------- | ----------------- |
| mensagem  | Área de texto | obrigatório    | automático        |

| **Comandos** | **Destino**                | **Tipo** |
| ------------ | ---------------            | -------- |
| voltar       | Preencher dados do cliente | default  |


##### 3.3.1.3 Wireframes (user tasks) 
![`wireframe Cadastro`](images/wireframeCadastro.png)
![`wireframe Cadastro`](images/wireframeCadastro2.png)

### 3.3.2 Processo 2 – (Gestão do Agendamento)

O processo de agendamento tem como objetivo permitir que o cliente reserve um horário de atendimento de forma organizada e automatizada.

No cenário atual (AS IS), os agendamentos são feitos manualmente por mensagens, causando interrupções no trabalho de Roberto e falta de organização. Já no cenário proposto (TO BE), o cliente (Lucas) pode visualizar horários disponíveis em tempo real, escolher o serviço e realizar o agendamento sem depender de interação direta com o barbeiro.

Esse processo melhora a pontualidade, reduz faltas e aumenta a eficiência da barbearia.

##### 3.3.2.1  Modelagem BPMN
![`Processo de Gestão de Agendamento Diagrama`](images/ProcessodeGestãodeAgendamentoDiagrama.png)
##### 3.3.2.2  Detalhamento das atividades do usuário (user tasks)

Os tipos de dados utilizados são:

Os tipos de dados utilizados no processo são:

* Área de texto: campo de texto de múltiplas linhas
* Caixa de texto: campo de texto de uma linha
* Número: campo numérico
* Data: campo do tipo data (dd-mm-aaaa)
* Hora: campo do tipo hora (hh:mm:ss)
* Data e Hora: campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)
* Imagem: campo contendo uma imagem
* Seleção única: campo com várias opções mutuamente exclusivas
* Seleção múltipla: campo com várias opções selecionáveis
* Arquivo: campo para upload de documentos
* Link: campo que armazena uma URL

**Visualizar serviços 1**
| **Campo**         | **Tipo**      | **Restrições**  | **Valor default** |
| ----------------- | ------------- | --------------- | ----------------- |
| lista de serviços | Seleção única | obrigatório     | -                 |
| tempo do serviço  | Número        | somente leitura | automático        |
| preço             | Número        | somente leitura | automático        |
| botão continuar   | Link          | -               | -                 |

| **Comandos** | **Destino**        | **Tipo** |
| ------------ | ------------------ | -------- |
| continuar    | Selecionar horário | default  |

**Selecionar data e horário 2**
| **Campo**       | **Tipo** | **Restrições**        | **Valor default** |
| ---------       | -------- | --------------------- | ----------------- |
| data            | Data     | obrigatória           | -                 |
| horário         | Hora     | deve estar disponível | -                 |
| botão revisar   | Link     | -                     | -                 |
| botão voltar    | Link     | -                     | -                 |

| **Comandos** | **Destino**               | **Tipo** |
| ------------ | ------------------------- | -------- |
| revisar      | Confirme seu Agendamento  | Link     |
| voltar       | Selecionar serviço        | cancel   |

**Confirmar Agendamento 3**
| **Campo**                  | **Tipo** | **Restrições**            | **Valor default** |
| ---------                  | -------- | ------------------------- | ----------------- |
| resumo do pedido           | Tabela   | atualização em tempo real | automático        |
| botão Confirmar Agendamento| Link     | -                         | -                 |
| botão voltar               | Link     | -                         | -                 |

| **Comandos**            | **Destino**                  | **Tipo** |
| ------------            | ---------------------------- | -------- |
| Confirmar Agendamento   | Fim do processo              | default  |
| voltar                  | Selecionar data e horário    | cancel   |

**Verificar disponibilidade 4**
| **Campo** | **Tipo** | **Restrições**            | **Valor default** |
| --------- | -------- | ------------------------- | ----------------- |
| agenda    | Tabela   | atualização em tempo real | automático        |

| **Comandos** | **Destino**                  | **Tipo** |
| ------------ | ---------------------------- | -------- |
| disponível   | Registrar agendamento        | default  |
| indisponível | Selecionar data e horário    | cancel   |


**Registrar agendamento 5**
| **Campo**    | **Tipo**           | **Restrições** | **Valor default** |
| ---------    | --------------     | -------------- | ----------------- |
| cliente      | Caixa de texto     | obrigatório    | automático        |
| serviço      | Caixa de texto     | obrigatório    | automático        |
| data         | Data               | obrigatório    | automático        |
| horário      | Hora               | obrigatório    | automático        |

| **Comandos** | **Destino**        | **Tipo** |
| ------------ | ------------------ | -------- |
| concluir     | Enviar confirmação | default  |

**Enviar confirmação 6**
| **Campo** | **Tipo**      | **Restrições** | **Valor default** |
| --------- | ------------- | -------------- | ----------------- |
| mensagem  | Área de texto | obrigatório    | automático        |

| **Comandos** | **Destino**     | **Tipo** |
| ------------ | --------------- | -------- |
| finalizar    | Fim do processo | default  |

**Definir horários de atendimento 7**
| **Campo**                    | **Tipo**         | **Restrições**    | **Valor default** |
| ---------------------------- | ---------------- | ----------------- | ----------------- |
| dias de funcionamento        | Seleção múltipla | obrigatório       | -                 |
| horário início               | Hora             | obrigatório       | -                 |
| horário fim                  | Hora             | obrigatório       | -                 |
| intervalo entre atendimentos | Número           | mínimo 10 minutos | 30                |

| **Comandos**    | **Destino**      | **Tipo** |
| --------------- | ---------------- | -------- |
| salvar horários | Atualizar agenda | default  |
| cancelar        | Fim do processo  | cancel   |

**Visualizar agenda do dia 8**
| **Campo**             | **Tipo** | **Restrições**  | **Valor default** |
| --------------------- | -------- | --------------- | ----------------- |
| data                  | Data     | obrigatório     | data atual        |
| lista de agendamentos | Tabela   | somente leitura | automático        |

| **Comandos** | **Destino**              | **Tipo** |
| ------------ | ------------------------ | -------- |
| atualizar    | Visualizar agenda do dia | default  |
| voltar       | Fim do processo          | cancel   |


##### 3.3.2.3 Wireframes (user tasks)
![`wireframe Agendamento`](images/wireframeAgendamento.png)
![`wireframe Agendamento`](images/wireframeAgendamento1.png)
![`wireframe Agendamento`](images/wireframeAgendamento2.png)
![`wireframe Agendamento`](images/wireframeAgendamento3.png)

### 3.3.3 Processo 3 – (Gestão do Financeira)
O processo de gestão financeira tem como objetivo registrar e controlar os valores recebidos pelos serviços realizados na barbearia.

No cenário atual (AS IS), o controle financeiro é feito manualmente, geralmente por anotações, o que pode gerar erros e falta de organização. No cenário proposto (TO BE),após o barbeiro concluir o serviço no sistema,ele registra automaticamente os serviços realizados com seus valores, permitindo que o Barbeiro tenha uma visão clara do faturamento diário.

Esse processo contribui para melhor controle financeiro, redução de erros e maior organização do negócio.

##### 3.3.3.1  Modelagem BPMN
![`Processo de Gestão Financeira Diagrama`](images/ProcessodeGestãoFinanceiraDiagrama.png)

##### 3.3.3.2  Detalhamento das atividades do usuário (user tasks)

Os tipos de dados utilizados no processo são:

* Área de texto: campo de texto de múltiplas linhas
* Caixa de texto: campo de texto de uma linha
* Lista: campo de lista suspensa
* Número: campo numérico
* Data: campo do tipo data (dd-mm-aaaa)
* Hora: campo do tipo hora (hh:mm:ss)
* Data e Hora: campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)
* Seleção única: campo com opções mutuamente exclusivas

**Informar serviço realizado 1**
| **Campo** | **Tipo**       | **Restrições** | **Valor default** |
| --------- | -------------- | -------------- | ----------------- |
| serviço   | lista          | obrigatório    | -                 |


**Informar valor do serviço 2**
| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --------- | -------- | -------------- | ----------------- |
| valor     | Número   | obrigatório    | -                 |

**Informar forma de pagamento 3**
| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --------- | -------- | -------------- | ----------------- |
| valor     | Número   | obrigatório    | -                 |



**Registrar pagamento 4**
| **Campo**                 | **Tipo** | **Restrições** | **Valor default** |
| ---------------           | -------- | -------------- | ----------------- |
| dados pagamento           | Tabela   | obrigatório    | automático        |
| botão confirmar pagamento | Tabela   | obrigatório    | automático        |

| **Comandos**              | **Destino**     | **Tipo** |
| ------------              | --------------- | -------- |
| confirmar pagamento       | Atualizar caixa | default  |

**Atualizar caixa 5**
| **Campo**      | **Tipo** | **Restrições** | **Valor default** |
| ------------   | -------- | -------------- | ----------------- |
| total recebido | Número   | automático     | atualizado        |

| **Comandos** | **Destino**     | **Tipo** |
| ------------ | --------------- | -------- |
| finalizar    | Fim do processo | default  |


##### 3.3.3.3 Wireframes (user tasks)
![`wireframe Financeiro`](images/wireframeFinanceiro.png)

### 3.3.4 Processo 4 – (Gestão da Avaliação do Serviço)

O processo de avaliação do serviço tem como objetivo coletar a opinião dos clientes sobre o atendimento realizado, permitindo melhorar a qualidade dos serviços prestados.

No cenário atual (AS IS), as avaliações são informais ou inexistentes, ocorrendo apenas verbalmente ou por redes sociais. No cenário proposto (TO BE), o sistema permite que o cliente (Lucas) avalie o serviço diretamente na plataforma, registrando nota e comentário.

Isso permite que Roberto acompanhe a satisfação dos clientes e identifique oportunidades de melhoria.

##### 3.3.4.1  Modelagem BPMN
![`Processo de Gestão da Avaliação do Serviço Diagrama`](images/ProcessodeGestãodaAvaliaçãodoServiçoDiagrama.png)

##### 3.3.4.2  Detalhamento das atividades do usuário (user tasks)
Os tipos de dados utilizados no processo são:

* Área de texto: campo de texto de múltiplas linhas
* Caixa de texto: campo de texto de uma linha
* Lista: campo de lista suspensa
* Link: campo que armazena uma URL
* Número: campo numérico
* Data: campo do tipo data (dd-mm-aaaa)
* Hora: campo do tipo hora (hh:mm:ss)
* Data e Hora: campo do tipo data e hora
* Seleção única: campo com opções mutuamente exclusivas
* Tabela: conjunto de dados estruturados


**Acessar avaliação 1**
| **Campo**         | **Tipo**       | **Restrições** | **Valor default** |
| ----------------- | -------------- | -------------- | ----------------- |
| avaliações        | Link           | -              | -        |

| **Comandos** | **Destino**     | **Tipo** |
| ------------ | -------------   | -------- |
| avaliações   | avaliar serviço | default  |

**Avaliar Serviço 2**
| **Campo**              | **Tipo**      | **Restrições**     | **Valor default** |
| ---------              | --------      | --------------     | ----------------- |
| nota (1 a 5)           | Número        | mínimo 1, máximo 5 | -                 |
| comentário             | Área de texto | opcional           | -                 |
| botão enviar avaliação | Link          | -                  | -                 |

| **Comandos**     | **Destino**         | **Tipo** |
| ------------     | ----------------    | -------- |
| enviar avaliação | Registrar avaliação | default  |

**Registrar avaliação 3**
| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --------- | -------- | -------------- | ----------------- |
| avaliação | Tabela   | obrigatório    | automático        |

| **Comandos** | **Destino**           | **Tipo** |
| ------------ | --------------------- | -------- |
| salvar       | Fim do processo       | default  |

**Visualizar avaliações 4**
| **Campo**                       | **Tipo** | **Restrições**  | **Valor default** |
| -------------------             | -------- | --------------- | ----------------- |
| últimas avaliações              | Tabela   | somente leitura | automático        |
| botão carregar mais avaliações  | Lista    | somente leitura | automático        |
| botão mais recentes             | Lista    | somente leitura | automático        |

| **Comandos**               | **Destino**                       | **Tipo** |
| ------------               | ---------------------             | -------- |
| carregar mais avaliações   | Amplia a lista de avaliações      | default  |
| mais recentes              | exibe as avaliações mais recentes | cancel   |

##### 3.3.4.3 Wireframes (user tasks)
![`wireframe Avaliacao`](images/wireframeAvaliacao.png)

### 3.3.5 Processo 5 – (Gestão do Estoque de Material da Barbearia)

O processo de gestão de estoque tem como objetivo controlar a quantidade de materiais utilizados na barbearia, garantindo que não faltem itens essenciais para a realização dos serviços.

No cenário atual (AS IS), o controle de estoque é feito manualmente, o que pode gerar esquecimentos e falta de materiais. No cenário proposto (TO BE), o sistema realiza o controle automático da quantidade de itens, alertando o barbeiro quando o estoque estiver baixo.

Esse processo melhora a organização e evita interrupções nos atendimentos por falta de produtos.

##### 3.3.5.1  Modelagem BPMN
![`Processo de Gestão de Estoque Diagrama`](images/ProcessodeGestãodeEstoqueDiagrama.png)

##### 3.3.5.2  Detalhamento das atividades do usuário (user tasks)

Os tipos de dados utilizados no processo são:

* Área de texto: campo de texto de múltiplas linhas
* Caixa de texto: campo de texto de uma linha
* Número: campo numérico
* Data: campo do tipo data (dd-mm-aaaa)
* Hora: campo do tipo hora (hh:mm:ss)
* Seleção única: campo com opções mutuamente exclusivas

**Utilizar material 1**
| **Campo**             | **Tipo**       | **Restrições** | **Valor default** |
| --------------------  | -------------- | -------------- | ----------------- |
| material utilizado    | Caixa de texto | obrigatório    | -                 |
| quantidade utilizada  | Número         | obrigatório    | -                 |
| observações           | Área de texto  | opcional       | -                 |
| botão registrar baixa | Link           | -              | -                 |

| **Comandos**    | **Destino**       | **Tipo** |
| -------------   | ----------------- | -------- |
| registrar baixa | Atualizar estoque | Link     |

**Atualizar estoque 2**
| **Campo**        | **Tipo** | **Restrições** | **Valor default** |
| ---------------- | -------- | -------------- | ----------------- |
| quantidade atual | Número   | automático     | atualizado        |

| **Comandos** | **Destino**           | **Tipo** |
| ------------ | --------------------- | -------- |
| verificar    | Gateway estoque baixo | default  |

**Gerar alerta de reposição 3**
| **Campo**       | **Tipo**      | **Restrições** | **Valor default** |
| --------------- | ------------- | -------------- | ----------------- |
| mensagem alerta | Área de texto | obrigatório    | automático        |

| **Comandos** | **Destino**           | **Tipo** |
| ------------ | --------------------- | -------- |
| notificar    | Verificar necessidade | default  |

**Verificar necessidade de compra 4**
| **Campo**             | **Tipo**       | **Restrições** | **Valor default** |
| --------------------- | -------------- | -------------- | ----------------- |
| material              | Caixa de texto | obrigatório    | -                 |
| quantidade necessária | Número         | obrigatório    | -                 |

| **Comandos** | **Destino**         | **Tipo** |
| ------------ | ------------------- | -------- |
| comprar      | Registrar reposição | default  |
| ignorar      | Fim do processo     | cancel   |

**Registrar reposição 5**
| **Campo**             | **Tipo**       | **Restrições** | **Valor default** |
| --------------------- | -------------- | -------------- | ----------------- |
| material              | Caixa de texto | obrigatório    | -                 |
| quantidade adicionada | Número         | obrigatório    | -                 |
| custo                 | Número         | obrigatório    | atual             |
| fornecedor            | Caixa de texto | obrigatório    | atual             |

| **Comandos**        | **Destino**       | **Tipo** |
| ------------        | ----------------- | -------- |
| confirmar reposição | Atualizar estoque | default  |

##### 3.3.5.3 Wireframes (user tasks) 
![`wireframe Estoque`](images/wireframeEstoque.png)

