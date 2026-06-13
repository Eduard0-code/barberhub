const BASE_URL = "http://localhost:8080/api";

async function buscar(caminho) {
  const resposta = await fetch(BASE_URL + caminho);
  if (!resposta.ok) {
    throw new Error("Falha ao buscar " + caminho);
  }
  return resposta.json();
}

async function enviar(caminho, dados, metodo = "POST") {
  const resposta = await fetch(BASE_URL + caminho, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.erro || "Falha ao enviar " + caminho);
  }
  return resposta.json();
}

export const kpiApi = {
  resumo: () => buscar("/kpi/resumo"),
  faturamentoPorDia: () => buscar("/kpi/faturamento-por-dia"),
  atendimentosPorBarbeiro: () => buscar("/kpi/atendimentos-por-barbeiro"),
  servicosMaisVendidos: () => buscar("/kpi/servicos-mais-vendidos"),
  ocupacaoBarbeiros: () => buscar("/kpi/ocupacao-barbeiros"),
};

export const clienteApi = {
  listar: () => buscar("/clientes"),
  criar: (dados) => enviar("/clientes", dados),
};

export const barbeiroApi = {
  listar: () => buscar("/barbeiros"),
  criar: (dados) => enviar("/barbeiros", dados),
};

export const servicoApi = {
  listar: () => buscar("/servicos"),
  criar: (dados) => enviar("/servicos", dados),
};

export const agendamentoApi = {
  listar: () => buscar("/agendamentos"),
  recentes: () => buscar("/agendamentos/recentes"),
  porCliente: (cliCodigo) => buscar("/agendamentos/por-cliente/" + cliCodigo),
  criar: (dados) => enviar("/agendamentos", dados),
  alterarStatus: (id, status) =>
    enviar("/agendamentos/" + id + "/status", { status }, "PUT"),
};

export const avaliacaoApi = {
  listar: () => buscar("/avaliacoes"),
  porAgendamento: (agdCodigo) => buscar("/avaliacoes/por-agendamento/" + agdCodigo),
  criar: (dados) => enviar("/avaliacoes", dados),
};

export const financeiroApi = {
  listar: () => buscar("/financeiro"),
  recentes: () => buscar("/financeiro/recentes"),
  resumo: () => buscar("/financeiro/resumo"),
  marcarComoPago: (id) => enviar("/financeiro/" + id + "/pagar", {}, "PUT"),
};

export const authApi = {
  login: (email, senha) => enviar("/auth/login", { email, senha }),
};

export const configuracaoAgendaApi = {
  listar: () => buscar("/configuracao-agenda"),
  porBarbeiro: (barCodigo) => buscar("/configuracao-agenda/barbeiro/" + barCodigo),
  salvar: (dados) => enviar("/configuracao-agenda", dados),
};


export function usuarioLogado() {
  const dados = localStorage.getItem("usuarioLogado");
  return dados ? JSON.parse(dados) : null;
}
