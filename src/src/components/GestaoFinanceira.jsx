import "./GestaoFinanceira.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MenuLateral from "../components/MenuLateral.jsx";
import { useEffect, useState } from "react";

import {
  Wallet,
  Users,
  Receipt,
  Plus,
  Check,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import GraficoFinanceiro from "../components/GraficoFinanceiro";
import { financeiroApi, kpiApi } from "../services/api.js";

const resumoPadrao = {
  totalRecebido: 0,
  recebidoHoje: 0,
  ticketMedio: 0,
  pagamentosPagos: 0,
  pagamentosPendentes: 0,
};

const formatarMoeda = (valor) =>
  Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const formatarHora = (hora) => {
  if (!hora) return "--:--";
  return String(hora).slice(0, 5);
};

const GestaoFinanceira = () => {
  const [periodo, setPeriodo] = useState("semana");
  const [resumo, setResumo] = useState(resumoPadrao);
  const [atendimentos, setAtendimentos] = useState([]);
  const [grafico, setGrafico] = useState([]);
  const [atualizando, setAtualizando] = useState(false);
  const [origem, setOrigem] = useState("exemplo");

  const carregar = () => {
    setAtualizando(true);
    return Promise.all([
      financeiroApi.resumo(),
      financeiroApi.recentes(),
      kpiApi.faturamentoPorDia(),
    ])
      .then(([r, a, g]) => {
        setResumo(r);
        setAtendimentos(a);
        setGrafico(g);
        setOrigem("banco");
      })
      .catch(() => {
        setOrigem("exemplo");
      })
      .finally(() => setAtualizando(false));
  };

  useEffect(() => {
    carregar();

    const aoFocar = () => carregar();
    window.addEventListener("focus", aoFocar);
    const intervalo = setInterval(carregar, 15000);

    return () => {
      window.removeEventListener("focus", aoFocar);
      clearInterval(intervalo);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="financeiro-container">
        <MenuLateral />

        <div className="financeiro-content">
          <div className="financeiro-topo">
            <h1>Gestão Financeira</h1>

            <div className="financeiro-acoes-topo">
              {origem === "exemplo" && (
                <span className="badge-offline">Backend offline</span>
              )}
              <button
                className="botao-atualizar"
                onClick={carregar}
                disabled={atualizando}
              >
                <RefreshCw size={15} className={atualizando ? "girando" : ""} />
                {atualizando ? "Atualizando" : "Atualizar"}
              </button>
            </div>
          </div>

          <div className="financeiro-cards">
            <div className="financeiro-card">
              <div className="card-icon">
                <Wallet size={18} />
              </div>
              <span>Total Recebido (Hoje)</span>
              <h2>{formatarMoeda(resumo.recebidoHoje)}</h2>
              <p>{formatarMoeda(resumo.totalRecebido)} no total</p>
            </div>

            <div className="financeiro-card">
              <div className="card-icon">
                <Users size={18} />
              </div>
              <span>Atendimentos</span>
              <h2>{(resumo.pagamentosPagos || 0) + (resumo.pagamentosPendentes || 0)}</h2>
              <p>{resumo.pagamentosPendentes || 0} pendentes</p>
            </div>

            <div className="financeiro-card">
              <div className="card-icon">
                <Receipt size={18} />
              </div>
              <span>Ticket Médio</span>
              <h2>{formatarMoeda(resumo.ticketMedio)}</h2>
              <p>Calculado com base nos pagamentos</p>
            </div>
          </div>

          <div className="financeiro-grid">
            <div className="pagamentos-card">
              <div className="pagamentos-header">
                <h3>Resumo Rápido</h3>
                <Plus size={18} />
              </div>

              <div className="pagamentos-body">
                <div className="resumo-linha">
                  <span>Pagamentos confirmados</span>
                  <strong>{resumo.pagamentosPagos || 0}</strong>
                </div>
                <div className="resumo-linha">
                  <span>Pagamentos pendentes</span>
                  <strong>{resumo.pagamentosPendentes || 0}</strong>
                </div>
                <div className="resumo-linha">
                  <span>Total geral</span>
                  <strong>{formatarMoeda(resumo.totalRecebido)}</strong>
                </div>
              </div>
            </div>

            <div className="table-card">
              <div className="table-header">
                <h3>Atendimentos Recentes</h3>

                <div className="table-actions">
                  <button>
                    <Filter size={15} />
                    Filtrar
                  </button>

                  <button>
                    <Download size={15} />
                    Exportar
                  </button>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>HORÁRIO</th>
                    <th>CLIENTE</th>
                    <th>SERVIÇO</th>
                    <th>VALOR</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {atendimentos.length === 0 && (
                    <tr>
                      <td colSpan={5} className="tabela-vazia">
                        Nenhum atendimento registrado ainda.
                      </td>
                    </tr>
                  )}
                  {atendimentos.map((item) => (
                    <tr key={item.finCodigo}>
                      <td>{formatarHora(item.horario)}</td>
                      <td className="cliente-name">{item.cliente}</td>
                      <td>{item.servico}</td>
                      <td className="valor-cell">{formatarMoeda(item.finValorPago)}</td>
                      <td>
                        <span
                          className={`status ${
                            item.statusAgendamento === "Concluido" ? "done" : "scheduled"
                          }`}
                        >
                          {item.statusAgendamento || item.finStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="table-footer">
                <span>
                  Mostrando {atendimentos.length} {atendimentos.length === 1 ? "registro" : "registros"}
                </span>

                <div className="pagination">
                  <button>
                    <ChevronLeft size={16} />
                  </button>

                  <button className="active-page">1</button>

                  <button>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>
                Evolução de Receita (
                {periodo === "semana" ? "Semanal" : "Mensal"})
              </h3>

              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
              >
                <option value="semana">Esta Semana</option>
                <option value="mes">Último Mês</option>
              </select>
            </div>

            <div className="chart-wrapper">
              <GraficoFinanceiro dados={grafico} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GestaoFinanceira;
