## 4. Projeto da Solução

<span style="color:red">Pré-requisitos: <a href="03-Modelagem do Processo de Negocio.md"> Modelagem do Processo de Negocio</a></span>

## 4.1. Arquitetura da solução


O diagrama mostra como a aplicação funciona e como as tecnologias se conectam.

O usuário acessa o sistema pelo navegador. A parte visual da aplicação é feita com HTML, CSS e React, garantindo uma interface moderna e responsiva. Essa aplicação é hospedada na Vercel.

O React se comunica com o backend desenvolvido em Spring Boot, que é responsável por processar as informações e regras do sistema. Os dados são armazenados no banco de dados MySQL.

Toda a comunicação acontece de forma segura, e a arquitetura foi organizada para oferecer bom desempenho, facilidade de manutenção e escalabilidade da aplicação.

![Projeto Arquitetura](./images/Projeto_arquitetura.png)
 
 
### 4.2. Protótipos de telas

# Cadastro
![Wireframe](./images/wireframeCadastro.png)
# Código 
[Cadastro-Login](../src/src/components/Cadastro-Login-Barber.jsx)

# Agendamento Cliente 
![Wireframe](./images/wireframeAgendamento.png)
# Código 
[Agendamento-Cliente](../src/src/components/AgendamentoCliente.jsx)

# Agendamento Barbeiro
![Wireframe](./images/wireframeAgendamento2.png)
# Código 
[Agendamento-Barbeiro](../src/src/components/AgendamentoBarbeiro.jsx)

# Agendamento Visualização Barbeiro
![Wireframe](./images/wireframeAgendamento3.png)
# Código 
[Visualização-Barbeiro](../src/src/components/VisualizacaoBarbeiro.jsx)



## Diagrama de Classes


### 4.3. Modelo de dados

#### 4.3.1 Modelo ER

![Diagrama ER](images/DIagrama%20ER.png)

![Esquema relacional](images/esquema%20relacional.png)


#### 4.3.2 Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 


![Tabela Relacional](images/Tabela%20Relacional.png)
---


#### 4.3.3 Modelo Físico

<code>

Table Clientes {
  CliCodigo integer [pk]
  CliNome varchar(50)
  CliEmail varchar(100)
  CliTelefone varchar(15)
  CliSenha varchar(20)
  CliCriado datetime
}

Table Barbeiro {
  BarCodigo integer [pk]
  BarNome varchar(50)
  BarTelefone varchar(15)
  BarEmail varchar(100)
  BarEspecialidade varchar(100)
  BarAtivo boolean
}

Table Servico {
  SrvCodigo integer [pk]
  SrvNome varchar(100)
  SrvPreco decimal(10,2)
}

Table Configuracao_Agenda {
  CfgCodigo integer [pk]
  BarCodigo integer [ref: > Barbeiro.BarCodigo]
  CfgDias varchar(50)
  CfgHorarioInicio time
  CfgHorarioFim time
  CfgIntervalo integer
}

Table Agendamento {
  AgdCodigo integer [pk]
  CliCodigo integer [ref: > Clientes.CliCodigo]
  BarCodigo integer [ref: > Barbeiro.BarCodigo]
  SrvCodigo integer [ref: > Servico.SrvCodigo]
  AgdData date
  AgdHorario time
  AgdPreco decimal(10,2)
  AgdStatus varchar(20)
}

</code>


### 4.4. Tecnologias.

Para o desenvolvimento do sistema de barbearia serão utilizadas tecnologias voltadas para frontend, backend, banco de dados e deploy da aplicação. O frontend será desenvolvido com React, HTML e CSS, responsáveis pela interface e interação do usuário. O backend utilizará Spring Boot para criação da API REST e regras de negócio. O armazenamento dos dados será realizado no MySQL. Já o deploy da aplicação será feito na plataforma Vercel.

O funcionamento do sistema ocorrerá da seguinte forma: o usuário acessa o frontend pelo navegador, que envia requisições para a API Spring Boot. O backend processa as informações, realiza consultas no banco MySQL e retorna as respostas para o usuário.

| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| SGBD           | MySQL           |
| Front end      | HTML+CSS+React    |
| Back end       | SpringBoot |
| Deploy         | Versel    |
| Versionamento  | GITHUB    |
