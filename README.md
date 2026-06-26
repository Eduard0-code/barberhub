# BarberHub

`CURSO`
Tecnologia em Análise e Desenvolvimento de Sistemas

`DISCIPLINA`
Trabalho Interdisciplinar: Aplicações para Processos de Negócios

`SEMESTRE`
`1/2026`

O BarberHub é uma solução digital de gestão desenhada para unificar a jornada da barbearia. Através de uma interface web intuitiva, o projeto otimiza o fluxo entre o agendamento do cliente, a rotina operacional do barbeiro e o controle financeiro do gestor. Utilizando modelagem de processos (BPMN), a ferramenta substitui o uso de múltiplas plataformas por um sistema centralizado que organiza desde o estoque até o faturamento, elevando a eficiência do negócio e a fidelização do cliente.

## Integrantes

* Álan Christian de Araújo Lima
* Arthur Henrique Madureira Penido
* Eduardo Costa Silva
* João Pedro Fernandes Carvalho

## Orientador

* Cleia Marcia Gomes Amaral

## Instruções de utilização

Assim que a primeira versão do sistema estiver disponível, deverá complementar com as instruções de utilização. Descreva como instalar eventuais dependências e como executar a aplicação.

## Deploy na Vercel

O frontend fica em `src/` e já está preparado para build na Vercel. O arquivo `vercel.json` da raiz executa o build dentro dessa pasta, publica `src/dist` e faz fallback para `index.html` nas rotas do React Router.

**Otimizações aplicadas:**
- Code splitting nas rotas (lazy loading) - cada tela carrega apenas quando acessada
- Chunking de dependências (React, ApexCharts, UI libs) em arquivos separados
- Fallback visual durante carregamento de rotas

Em ambiente local, o build continua alimentando `backend/src/main/resources/static` para manter o fluxo com o Spring Boot. Para funcionar em produção, o backend Spring Boot precisa estar publicado em uma URL própria. 

**Próximos passos:**
1. Veja [DEPLOY-BACKEND.md](DEPLOY-BACKEND.md) para publicar o backend (recomendado: Railway, PlanetScale para DB)
2. Configure a variável `VITE_API_URL` na Vercel com o endereço base do backend
3. Consulte [.env.example](.env.example) para configuração local

# Documentação

<ol>
<li><a href="docs/1-Contexto.md"> Documentação de Contexto</a></li>
<li><a href="docs/2-Especificação.md"> Especificação do Projeto</a></li>
<li><a href="docs/3-Modelagem-Processos-Negócio.md"> Modelagem dos Processos de Negocio</a></li>
<li><a href="docs/4-Projeto-Solucao.md"> Projeto da solução</a></li>
<li><a href="docs/5-Planejamento-Projeto.md"> Planejamento do Projeto</a></li>
<li><a href="docs/6-Interface-Sistema.md"> Interface do Sistema</a></li>
<li><a href="docs/7-Indicadores.md"> Indicadores</a></li>
<li><a href="docs/8-Conclusão.md"> Conclusão</a></li>
<li><a href="docs/9-Referências.md"> Referências</a></li>
</ol>

# Código

<li><a href="src/README.md"> Código Fonte</a></li>

# Apresentação

<li><a href="docs/apresentacao/README.md"> Apresentação da solução</a></li>


## Histórico de versões

* 0.1.1
    * CHANGE: Atualização das documentações. Código permaneceu inalterado.
* 0.1.0
    * Implementação da funcionalidade X pertencente ao processo P.
* 0.0.1
    * Trabalhando na modelagem do processo de negócio.

