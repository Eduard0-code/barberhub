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
[Cadastro-Login](../src/src/components/AgendamentoCliente.jsx)

# Agendamento Barbeiro
![Wireframe](./images/wireframeAgendamento2.png)
# Código 
[Cadastro-Login](../src/src/components/AgendamentoBarbeiro.jsx)

# Agendamento Visualização Barbeiro
![Wireframe](./images/wireframeAgendamento3.png)
# Código 
[Cadastro-Login](../src/src/components/VisualizacaoBarbeiro.jsx)



## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Classes”.

> - [Diagramas de Classes - Documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.6.1?topic=diagrams-class)
> - [O que é um diagrama de classe UML? | Lucidchart](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)


### 4.3. Modelo de dados

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam efetuar os cadastros de dados e controles associados aos processos identificados, assim como recuperações.
Utilizando a notação do DER (Diagrama Entidade e Relacionamento), elaborem um modelo, na ferramenta visual indicada na disciplina, que contemple todas as entidades e atributos associados às atividades dos processos identificados. Deve ser gerado um único DER que suporte todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo deve contemplar, também, o controle de acesso de usuários (partes interessadas dos processos) de acordo com os papéis definidos nos modelos do processo de negócio.
_Apresente o modelo de dados por meio de um modelo relacional que contemple todos os conceitos e atributos apresentados na modelagem dos processos._

#### 4.3.1 Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

![Diagrama ER](images/DIagrama%20ER.png)

![esquema relacional](images/esquema%20relacional.png)


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
  ClisenhaConfirmar varchar(20)
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
| API REST       | JAVA      |
| Versionamento  | GITHUB    |
