import "./Indicadores.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MenuLateral from "../components/MenuLateral.jsx";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  Wallet,
  Star,
  TrendingUp,
  AlertCircle,
  Users,
  Scissors,
  RefreshCw,
} from "lucide-react";
import { kpiApi } from "../services/api.js";

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

const barbeirosMock = [
  { rotulo: "Rafael Souza", valor: 42 },
  { rotulo: "Lucas Mendes", valor: 35 },
  { rotulo: "Pedro Alves", valor: 28 },
];

const servicosMock = [
  { rotulo: "Corte de Cabelo", valor: 38 },
  { rotulo: "Corte + Barba", valor: 24 },
  { rotulo: "Barba Completa", valor: 18 },
  { rotulo: "Sobrancelha", valor: 12 },
  { rotulo: "Corte + Pigmentação", valor: 8 },
];

const ocupacaoMock = [
  { rotulo: "Rafael Souza", valor: 82 },
  { rotulo: "Lucas Mendes", valor: 67 },
  { rotulo: "Pedro Alves", valor: 54 },
];

const formatarMoeda = (valor) =>
  Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const Indicadores = () => {
  const [periodo, setPeriodo] = useState("semana");
  const [origem, setOrigem] = useState("exemplo");
  const [atualizando, setAtualizando] = useState(false);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);

  const [resumo, setResumo] = useState(resumoMock);
  const [faturamento, setFaturamento] = useState(faturamentoMock);
  const [barbeiros, setBarbeiros] = useState(barbeirosMock);
  const [servicos, setServicos] = useState(servicosMock);
  const [ocupacao, setOcupacao] = useState(ocupacaoMock);

  const carregar = () => {
    setAtualizando(true);
    return Promise.all([
      kpiApi.resumo(),
      kpiApi.faturamentoPorDia(),
      kpiApi.atendimentosPorBarbeiro(),
      kpiApi.servicosMaisVendidos(),
      kpiApi.ocupacaoBarbeiros(),
    ])
      .then(([r, f, b, s, o]) => {
        setResumo(r);
        setFaturamento(f.length ? f : faturamentoMock);
        setBarbeiros(b.length ? b : barbeirosMock);
        setServicos(s.length ? s : servicosMock);
        setOcupacao(o.length ? o : ocupacaoMock);
        setOrigem("banco");
        setUltimaAtualizacao(new Date());
      })
      .catch(() => {
        setOrigem("exemplo");
      })
      .finally(() => {
        setAtualizando(false);
      });
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

  const cards = [
    {
      titulo: "Faturamento total",
      valor: formatarMoeda(resumo.faturamentoTotal),
      meta: "Meta: crescer 10% ao mês",
      icone: <Wallet size={18} />,
    },
    {
      titulo: "Ticket médio",
      valor: formatarMoeda(resumo.ticketMedio),
      meta: "Meta: acima de R$ 55,00",
      icone: <TrendingUp size={18} />,
    },
    {
      titulo: "Avaliação média",
      valor: Number(resumo.avaliacaoMedia).toFixed(1),
      meta: "Meta: acima de 4,5",
      icone: <Star size={18} />,
    },
    {
      titulo: "Taxa de cancelamento",
      valor: Number(resumo.taxaCancelamento).toFixed(1) + "%",
      meta: "Meta: abaixo de 10%",
      icone: <AlertCircle size={18} />,
    },
  ];

  const graficoFaturamento = {
    series: [{ name: "Receita", data: faturamento.map((p) => Number(p.valor)) }],
    options: {
      chart: { toolbar: { show: false }, zoom: { enabled: false } },
      stroke: { curve: "smooth", width: 3 },
      dataLabels: { enabled: false },
      grid: { borderColor: "#ececec" },
      xaxis: {
        categories: faturamento.map((p) => p.rotulo),
        labels: { style: { colors: "#6b7280", fontSize: "13px" } },
      },
      yaxis: {
        labels: {
          formatter: (val) => "R$ " + val,
          style: { colors: "#6b7280", fontSize: "13px" },
        },
      },
      tooltip: { theme: "light" },
      colors: ["#1f2937"],
    },
  };

  const graficoBarbeiros = {
    series: [{ name: "Atendimentos", data: barbeiros.map((p) => Number(p.valor)) }],
    options: {
      chart: { toolbar: { show: false } },
      plotOptions: { bar: { borderRadius: 6, columnWidth: "45%" } },
      dataLabels: { enabled: false },
      grid: { borderColor: "#ececec" },
      xaxis: {
        categories: barbeiros.map((p) => p.rotulo),
        labels: { style: { colors: "#6b7280", fontSize: "13px" } },
      },
      yaxis: {
        labels: { style: { colors: "#6b7280", fontSize: "13px" } },
      },
      colors: ["#1f2937"],
    },
  };

  const graficoServicos = {
    series: servicos.map((p) => Number(p.valor)),
    options: {
      chart: { toolbar: { show: false } },
      labels: servicos.map((p) => p.rotulo),
      legend: {
        position: "bottom",
        labels: { colors: "#6b7280" },
        fontSize: "13px",
      },
      dataLabels: { enabled: true },
      colors: ["#1f2937", "#374151", "#6b7280", "#9ca3af", "#d1d5db"],
    },
  };

  return (
    <>
      <Header />
      <div className="indicadores-container">
        <MenuLateral />

        <div className="indicadores-content">
          <div className="indicadores-topo">
            <div>
              <h1>Indicadores e Relatórios</h1>
              <p>
                Visão geral do desempenho da barbearia
                {origem === "exemplo" && (
                  <span className="badge-exemplo">
                    Dados de exemplo (backend offline)
                  </span>
                )}
              </p>
            </div>

            <div className="indicadores-acoes">
              <button
                className="botao-atualizar"
                onClick={carregar}
                disabled={atualizando}
                title="Atualizar agora"
              >
                <RefreshCw size={15} className={atualizando ? "girando" : ""} />
                {atualizando ? "Atualizando" : "Atualizar"}
              </button>

              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="indicadores-periodo"
              >
                <option value="semana">Esta semana</option>
                <option value="mes">Este mês</option>
                <option value="ano">Este ano</option>
              </select>
            </div>
          </div>

          {ultimaAtualizacao && origem === "banco" && (
            <p className="ultima-atualizacao">
              Última leitura do banco às{" "}
              {ultimaAtualizacao.toLocaleTimeString("pt-BR")}
            </p>
          )}

          <div className="indicadores-cards">
            {cards.map((card) => (
              <div className="indicador-card" key={card.titulo}>
                <div className="indicador-icone">{card.icone}</div>
                <span>{card.titulo}</span>
                <h2>{card.valor}</h2>
                <p>{card.meta}</p>
              </div>
            ))}
          </div>

          <div className="indicadores-grid">
            <div className="indicador-bloco">
              <div className="bloco-header">
                <h3>Faturamento por dia</h3>
                <span>Últimos dias</span>
              </div>
              <div className="bloco-body">
                <Chart
                  options={graficoFaturamento.options}
                  series={graficoFaturamento.series}
                  type="line"
                  height={300}
                />
              </div>
            </div>

            <div className="indicador-bloco">
              <div className="bloco-header">
                <h3>Atendimentos por barbeiro</h3>
                <span>Total no período</span>
              </div>
              <div className="bloco-body">
                <Chart
                  options={graficoBarbeiros.options}
                  series={graficoBarbeiros.series}
                  type="bar"
                  height={300}
                />
              </div>
            </div>
          </div>

          <div className="indicadores-grid-2">
            <div className="indicador-bloco">
              <div className="bloco-header">
                <h3>Serviços mais vendidos</h3>
                <span>Distribuição</span>
              </div>
              <div className="bloco-body">
                <Chart
                  options={graficoServicos.options}
                  series={graficoServicos.series}
                  type="donut"
                  height={320}
                />
              </div>
            </div>

            <div className="indicador-bloco">
              <div className="bloco-header">
                <h3>Taxa de ocupação</h3>
                <span>Por barbeiro</span>
              </div>
              <div className="bloco-body lista-ocupacao">
                {ocupacao.map((item) => (
                  <div className="linha-ocupacao" key={item.rotulo}>
                    <div className="linha-info">
                      <div className="linha-titulo">
                        <Users size={15} />
                        <strong>{item.rotulo}</strong>
                      </div>
                      <span>{Number(item.valor).toFixed(1)}%</span>
                    </div>
                    <div className="barra-fora">
                      <div
                        className="barra-dentro"
                        style={{ width: Number(item.valor) + "%" }}
                      />
                    </div>
                  </div>
                ))}

                <div className="lista-rodape">
                  <Scissors size={14} />
                  <span>Meta: acima de 70% por barbeiro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Indicadores;
