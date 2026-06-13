import { useEffect, useMemo, useState } from "react";
import "./VisualizacaoBarbeiro.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuLateral from "./MenuLateral";
import { CalendarDays, RefreshCcw, ArrowLeft, Info } from "lucide-react";
import { agendamentoApi, servicoApi, clienteApi } from "../services/api.js";

const VisualizacaoBarbeiro = () => {
  const hoje = new Date().toISOString().slice(0, 10);
  const [dataSelecionada, setDataSelecionada] = useState(hoje);
  const [todosAgendamentos, setTodosAgendamentos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const carregarDados = () => {
    setCarregando(true);
    Promise.all([
      agendamentoApi.listar(),
      servicoApi.listar(),
      clienteApi.listar(),
    ])
      .then(([agds, srvs, clis]) => {
        setTodosAgendamentos(agds);
        setServicos(srvs);
        setClientes(clis);
      })
      .catch(() => {})
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const agendamentos = useMemo(() => {
    const mapaServico = {};
    servicos.forEach((s) => (mapaServico[s.srvCodigo] = s.srvNome));
    const mapaCliente = {};
    clientes.forEach((c) => (mapaCliente[c.cliCodigo] = c.cliNome));

    const normalizar = (data) => {
      if (!data) return "";
      if (Array.isArray(data)) {
        const [y, m, d] = data;
        return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      }
      return String(data).slice(0, 10);
    };

    return todosAgendamentos
      .filter((a) => normalizar(a.agdData) === dataSelecionada)
      .sort((a, b) => (String(a.agdHorario) > String(b.agdHorario) ? 1 : -1))
      .map((a) => ({
        horario: String(a.agdHorario).slice(0, 5),
        cliente: mapaCliente[a.cliCodigo] || "Cliente",
        servico: mapaServico[a.srvCodigo] || "Serviço",
        status: a.agdStatus,
      }));
  }, [todosAgendamentos, dataSelecionada, servicos, clientes]);

  const dataFormatada = useMemo(() => {
    return new Date(dataSelecionada + "T12:00:00").toLocaleDateString("pt-BR");
  }, [dataSelecionada]);

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="visualizacao-page">
        <MenuLateral />
        <main className="visualizacao-main">
          <div className="top-menu">
            <button
              className="menu-link"
              onClick={() => navigate("/agendamento-barbeiro")}
            >
              <Info size={14} />
              Definir Horários de Atendimento
            </button>

            <button className="menu-link active-link">
              <CalendarDays size={14} />
              Visualizar Agenda do Dia
            </button>
          </div>

          <section className="agenda-header">
            <h1>Agenda do Dia</h1>
            <p>Consulte os agendamentos programados para uma data específica.</p>
          </section>

          <section className="date-card">
            <label>Selecionar Data</label>

            <div className="date-actions">
              <div className="date-input-wrapper">
                <input
                  type="date"
                  value={dataSelecionada}
                  onChange={(e) => setDataSelecionada(e.target.value)}
                />
                <CalendarDays size={17} />
              </div>

              <button
                className="update-button"
                onClick={carregarDados}
                disabled={carregando}
              >
                <RefreshCcw size={15} className={carregando ? "girando" : ""} />
                {carregando ? "Atualizando..." : "Atualizar"}
              </button>
            </div>
          </section>

          <section className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>Cliente</th>
                  <th>Serviço</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {agendamentos.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: "24px", color: "#6b7280" }}>
                      {carregando ? "Carregando..." : "Nenhum agendamento para esta data."}
                    </td>
                  </tr>
                ) : (
                  agendamentos.map((agendamento, idx) => (
                    <tr key={`${agendamento.horario}-${idx}`}>
                      <td>{agendamento.horario}</td>

                      <td>
                        <div className="cliente-cell">
                          <div className="cliente-avatar">
                            {agendamento.cliente.charAt(0)}
                          </div>
                          <span>{agendamento.cliente}</span>
                        </div>
                      </td>

                      <td>{agendamento.servico}</td>

                      <td>
                        <span
                          style={{
                            padding: "2px 10px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: 600,
                            background:
                              agendamento.status === "Concluido"
                                ? "#d1fae5"
                                : agendamento.status === "Cancelado"
                                ? "#fee2e2"
                                : "#e0f2fe",
                            color:
                              agendamento.status === "Concluido"
                                ? "#065f46"
                                : agendamento.status === "Cancelado"
                                ? "#991b1b"
                                : "#0369a1",
                          }}
                        >
                          {agendamento.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

          <section className="bottom-info">
            <div className="left-info">
              <Info size={15} />
              <span>
                Total de agendamentos:
                <strong> {agendamentos.length}</strong>
              </span>
            </div>

            <span className="selected-date">
              Data selecionada: {dataFormatada}
            </span>
          </section>

          <button
            className="back-button"
            onClick={() => navigate("/agendamento-barbeiro")}
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default VisualizacaoBarbeiro;
