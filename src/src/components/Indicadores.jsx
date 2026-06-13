import "./Indicadores.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MenuLateral from "../components/MenuLateral.jsx";
import { useEffect, useMemo, useState } from "react";
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

const formatarMoeda = (valor) =>
  Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const formatarDiaMes = (rotulo) => {
  const data = new Date(rotulo);
  if (Number.isNaN(data.getTime())) return rotulo;
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  return `${dia}/${mes}`;
};

const janelaPeriodo = { semana: 7, mes: 30, ano: 365 };

const Indicadores = () => {
  const [periodo, setPeriodo] = useState("semana");
  const [origem, setOrigem] = useState("banco");
  const [atualizando, setAtualizando] = useState(false);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  const [resumo, setResumo] = useState({
    faturamentoTotal: 0,
    ticketMedio: 0,
    avaliacaoMedia: 0,
    taxaCancelamento: 0,
  });
  const [faturamento, setFaturamento] = useState([]);
  const [barbeiros, setBarbeiros] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [ocupacao, setOcupacao] = useState([]);

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
        setFaturamento(f);
        setBarbeiros(b);
        setServicos(s);
        setOcupacao(o);
        setOrigem("banco");
        setErro(false);
        setUltimaAtualizacao(new Date());
      })
      .catch(() => {
        setErro(true);
      })
      .finally(() => {
        setAtualizando(false);
        setCarregando(false);
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

  const faturamentoFiltrado = useMemo(() => {
    const dias = janelaPeriodo[periodo] ?? janelaPeriodo.semana;
    const limite = new Date();
    limite.setHours(0, 0, 0, 0);
    limite.setDate(limite.getDate() - (dias - 1));
    return faturamento.filter((p) => {
      const data = new Date(p.rotulo);
      return !Number.isNaN(data.getTime()) && data >= limite;
    });
  }, [faturamento, periodo]);

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
    series: [
      { name: "Receita", data: faturamentoFiltrado.map((p) => Number(p.valor)) },
    ],
    options: {
      chart: { toolbar: { show: false }, zoom: { enabled: false } },
      stroke: { curve: "smooth", width: 3 },
      dataLabels: { enabled: false },
      grid: { borderColor: "#ececec" },
      xaxis: {
        categories: faturamentoFiltrado.map((p) => formatarDiaMes(p.rotulo)),
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

  const semDados =
    !faturamento.length &&
    !barbeiros.length &&
    !servicos.length &&
    !ocupacao.length;

  return (
    <>
      <Header />
      <div className="indicadores-container">
        <MenuLateral />

        <div className="indicadores-content">
          <div className="indicadores-topo">
            <div>
              <h1>Indicadores e Relatórios</h1>
              <p>Visão geral do desempenho da barbearia</p>
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

          {carregando && semDados && (
            <p className="ultima-atualizacao">Carregando indicadores...</p>
          )}

          {erro && semDados && (
            <p className="ultima-atualizacao">
              Não foi possível carregar os indicadores. Verifique se o servidor
              está ativo.
            </p>
          )}

          {ultimaAtualizacao && origem === "banco" && !erro && (
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
                {faturamentoFiltrado.length ? (
                  <Chart
                    options={graficoFaturamento.options}
                    series={graficoFaturamento.series}
                    type="line"
                    height={300}
                  />
                ) : (
                  <p className="sem-dados">Sem dados para exibir.</p>
                )}
              </div>
            </div>

            <div className="indicador-bloco">
              <div className="bloco-header">
                <h3>Atendimentos por barbeiro</h3>
                <span>Total no período</span>
              </div>
              <div className="bloco-body">
                {barbeiros.length ? (
                  <Chart
                    options={graficoBarbeiros.options}
                    series={graficoBarbeiros.series}
                    type="bar"
                    height={300}
                  />
                ) : (
                  <p className="sem-dados">Sem dados para exibir.</p>
                )}
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
                {servicos.length ? (
                  <Chart
                    options={graficoServicos.options}
                    series={graficoServicos.series}
                    type="donut"
                    height={320}
                  />
                ) : (
                  <p className="sem-dados">Sem dados para exibir.</p>
                )}
              </div>
            </div>

            <div className="indicador-bloco">
              <div className="bloco-header">
                <h3>Taxa de ocupação</h3>
                <span>Por barbeiro</span>
              </div>
              <div className="bloco-body lista-ocupacao">
                {ocupacao.length ? (
                  ocupacao.map((item) => (
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
                  ))
                ) : (
                  <p className="sem-dados">Sem dados para exibir.</p>
                )}

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
