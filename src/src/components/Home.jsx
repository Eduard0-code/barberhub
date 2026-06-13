import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import {
  Wallet,
  CalendarDays,
  Star,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  ArrowRight,
  Users,
  DollarSign,
  BarChart3,
} from "lucide-react";

import Header from "./Header";
import MenuLateral from "./MenuLateral";
import Footer from "./Footer";
import { kpiApi, financeiroApi, agendamentoApi, clienteApi, servicoApi } from "../services/api.js";
import "./Home.css";

const formatarMoeda = (valor) =>
  Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const formatarHora = (hora) => {
  if (!hora) return "--:--";
  return String(hora).slice(0, 5);
};

const resumoMock = {
  faturamentoTotal: 12450,
  ticketMedio: 58.3,
  avaliacaoMedia: 4.7,
  taxaCancelamento: 8.3,
};

const faturamentoMock = [
  { rotulo: "Seg", valor: 320 },
  { rotulo: "Ter", valor: 410 },
  { rotulo: "Qua", valor: 380 },
  { rotulo: "Qui", valor: 520 },
  { rotulo: "Sex", valor: 610 },
  { rotulo: "Sáb", valor: 780 },
  { rotulo: "Dom", valor: 540 },
];

const agendamentosMock = [
  { agdCodigo: 1, agdHorario: "09:00", cliNome: "João Silva", srvNome: "Corte + Barba", agdStatus: "Concluído" },
  { agdCodigo: 2, agdHorario: "10:30", cliNome: "Carlos Mendes", srvNome: "Corte de Cabelo", agdStatus: "Agendado" },
  { agdCodigo: 3, agdHorario: "11:00", cliNome: "Pedro Costa", srvNome: "Barba Completa", agdStatus: "Agendado" },
  { agdCodigo: 4, agdHorario: "14:00", cliNome: "Lucas Rocha", srvNome: "Corte + Pigmentação", agdStatus: "Cancelado" },
];

const statusClass = (status) => {
  if (status === "Concluído" || status === "Concluido") return "home-status-concluido";
  if (status === "Cancelado") return "home-status-cancelado";
  return "home-status-agendado";
};

const Home = () => {
  const navigate = useNavigate();
  const [resumo, setResumo] = useState(resumoMock);
  const [faturamento, setFaturamento] = useState(faturamentoMock);
  const [agendamentos, setAgendamentos] = useState(agendamentosMock);
  const [finResumo, setFinResumo] = useState({ recebidoHoje: 0, pagamentosPagos: 0, pagamentosPendentes: 0 });
  const [atualizando, setAtualizando] = useState(false);
  const [origem, setOrigem] = useState("exemplo");

  const carregar = () => {
    setAtualizando(true);
    return Promise.all([
      kpiApi.resumo(),
      kpiApi.faturamentoPorDia(),
      agendamentoApi.recentes(),
      financeiroApi.resumo(),
      clienteApi.listar(),
      servicoApi.listar(),
    ])
      .then(([r, f, a, fr, clientes, servicos]) => {
        setResumo(r);
        setFaturamento(f && f.length ? f : faturamentoMock);
        setFinResumo(fr);
        setOrigem("banco");

        if (a && a.length) {
          const mapaCliente = {};
          clientes.forEach((c) => (mapaCliente[c.cliCodigo] = c.cliNome));
          const mapaServico = {};
          servicos.forEach((s) => (mapaServico[s.srvCodigo] = s.srvNome));
          const enriquecidos = a.map((ag) => ({
            ...ag,
            cliNome: mapaCliente[ag.cliCodigo] || "—",
            srvNome: mapaServico[ag.srvCodigo] || "—",
          }));
          setAgendamentos(enriquecidos);
        } else {
          setAgendamentos(agendamentosMock);
        }
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

  const hojeFormatado = (() => {
    const d = new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return d.charAt(0).toUpperCase() + d.slice(1);
  })();

  const graficoFaturamento = {
    series: [{ name: "Receita", data: faturamento.map((p) => Number(p.valor)) }],
    options: {
      chart: { toolbar: { show: false }, zoom: { enabled: false } },
      stroke: { curve: "smooth", width: 3 },
      dataLabels: { enabled: false },
      grid: { borderColor: "#ececec" },
      xaxis: {
        categories: faturamento.map((p) => p.rotulo),
        labels: { style: { colors: "#6b7280", fontSize: "12px" } },
      },
      yaxis: {
        labels: {
          formatter: (val) => "R$ " + val,
          style: { colors: "#6b7280", fontSize: "12px" },
        },
      },
      tooltip: { theme: "light" },
      colors: ["#1f2937"],
    },
  };

  const cards = [
    {
      titulo: "Faturamento (Hoje)",
      valor: formatarMoeda(finResumo.recebidoHoje),
      sub: formatarMoeda(resumo.faturamentoTotal) + " no total",
      icone: <Wallet size={18} />,
      metaOk: null,
    },
    {
      titulo: "Ticket Médio",
      valor: formatarMoeda(resumo.ticketMedio),
      sub: "Meta: acima de R$ 55,00",
      icone: <TrendingUp size={18} />,
      metaOk: Number(resumo.ticketMedio) >= 55,
    },
    {
      titulo: "Avaliação Média",
      valor: Number(resumo.avaliacaoMedia || 0).toFixed(1) + " ★",
      sub: "Meta: acima de 4,5",
      icone: <Star size={18} />,
      metaOk: Number(resumo.avaliacaoMedia) >= 4.5,
    },
    {
      titulo: "Taxa de Cancelamento",
      valor: Number(resumo.taxaCancelamento || 0).toFixed(1) + "%",
      sub: "Meta: abaixo de 10%",
      icone: <AlertCircle size={18} />,
      metaOk: Number(resumo.taxaCancelamento) < 10,
    },
  ];

  const atalhos = [
    { label: "Agendar", icone: <CalendarDays size={20} />, rota: "/agendamento-cliente" },
    { label: "Financeiro", icone: <DollarSign size={20} />, rota: "/gestao-financeira" },
    { label: "Avaliar", icone: <Star size={20} />, rota: "/avaliacao-cliente" },
    { label: "Indicadores", icone: <BarChart3 size={20} />, rota: "/indicadores" },
    { label: "Clientes", icone: <Users size={20} />, rota: "/visualizacao-barbeiro" },
  ];

  return (
    <>
      <Header />
      <div className="home-container">
        <MenuLateral />

        <div className="home-content">
          <div className="home-topo">
            <div>
              <h1>Dashboard</h1>
              <p className="home-data">{hojeFormatado}</p>
            </div>
            <div className="home-acoes-topo">
              {origem === "exemplo" && (
                <span className="home-badge-offline">Dados de exemplo</span>
              )}
              <button
                className="home-botao-atualizar"
                onClick={carregar}
                disabled={atualizando}
              >
                <RefreshCw size={15} className={atualizando ? "home-girando" : ""} />
                {atualizando ? "Atualizando" : "Atualizar"}
              </button>
            </div>
          </div>

          <div className="home-cards">
            {cards.map((card) => (
              <div className="home-card" key={card.titulo}>
                <div className="home-card-icone">{card.icone}</div>
                <span className="home-card-label">{card.titulo}</span>
                <h2 className="home-card-valor">{card.valor}</h2>
                <p
                  className={
                    card.metaOk === null
                      ? "home-card-sub"
                      : card.metaOk
                      ? "home-card-sub home-meta-ok"
                      : "home-card-sub home-meta-alerta"
                  }
                >
                  {card.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="home-grid">
            <div className="home-bloco">
              <div className="home-bloco-header">
                <h3>Agendamentos Recentes</h3>
                <span>{agendamentos.length} no total</span>
              </div>
              <div className="home-bloco-body home-sem-padding">
                {agendamentos.length === 0 ? (
                  <p className="home-vazio">Nenhum agendamento encontrado.</p>
                ) : (
                  <table className="home-tabela">
                    <thead>
                      <tr>
                        <th>HORÁRIO</th>
                        <th>CLIENTE</th>
                        <th>SERVIÇO</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agendamentos.slice(0, 7).map((item, idx) => (
                        <tr key={item.agdCodigo ?? item.finCodigo ?? idx}>
                          <td>{formatarHora(item.agdHorario ?? item.horario)}</td>
                          <td className="home-nome-negrito">{item.cliNome ?? item.cliente ?? "—"}</td>
                          <td>{item.srvNome ?? item.servico ?? "—"}</td>
                          <td>
                            <span className={`home-status ${statusClass(item.agdStatus ?? item.statusAgendamento)}`}>
                              {item.agdStatus ?? item.statusAgendamento ?? "Agendado"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="home-bloco">
              <div className="home-bloco-header">
                <h3>Faturamento Semanal</h3>
                <span>Evolução por dia</span>
              </div>
              <div className="home-bloco-body">
                <Chart
                  options={graficoFaturamento.options}
                  series={graficoFaturamento.series}
                  type="line"
                  height={270}
                />
              </div>
            </div>
          </div>

          <div className="home-atalhos-secao">
            <h3>Acesso Rápido</h3>
            <div className="home-atalhos">
              {atalhos.map((a) => (
                <button
                  key={a.rota}
                  className="home-atalho"
                  onClick={() => navigate(a.rota)}
                >
                  {a.icone}
                  <span>{a.label}</span>
                  <ArrowRight size={14} className="home-atalho-seta" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
