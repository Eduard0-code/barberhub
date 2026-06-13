import { useEffect, useState } from "react";
import "./Ajustes.css";
import Header from "./Header";
import Footer from "./Footer";
import MenuLateral from "./MenuLateral";
import {
  Scissors,
  Users,
  CalendarDays,
  Plus,
  Check,
  Save,
  RefreshCw,
} from "lucide-react";
import {
  servicoApi,
  barbeiroApi,
  configuracaoAgendaApi,
} from "../services/api.js";

const DIAS_SEMANA = [
  { id: "Seg", label: "Segunda" },
  { id: "Ter", label: "Terça" },
  { id: "Qua", label: "Quarta" },
  { id: "Qui", label: "Quinta" },
  { id: "Sex", label: "Sexta" },
  { id: "Sab", label: "Sábado" },
  { id: "Dom", label: "Domingo" },
];

const parseDias = (str) => (str ? str.split(",").map((d) => d.trim()) : []);
const formataDias = (arr) => arr.join(",");

// ─── ABA SERVIÇOS ────────────────────────────────────────────────────────────
const AbaServicos = () => {
  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const carregar = () =>
    servicoApi.listar().then(setServicos).catch(() => {});

  useEffect(() => {
    carregar();
  }, []);

  const adicionar = async () => {
    setErro("");
    setMensagem("");
    if (!nome.trim()) { setErro("Informe o nome do serviço"); return; }
    const precoNum = parseFloat(preco.replace(",", "."));
    if (isNaN(precoNum) || precoNum <= 0) { setErro("Informe um preço válido"); return; }

    setSalvando(true);
    try {
      await servicoApi.criar({ srvNome: nome.trim(), srvPreco: precoNum });
      setNome("");
      setPreco("");
      setMensagem("Serviço adicionado com sucesso");
      carregar();
    } catch {
      setErro("Falha ao adicionar serviço");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="ajustes-secao">
      <h2 className="ajustes-titulo-secao">
        <Scissors size={18} /> Serviços
      </h2>
      <p className="ajustes-desc">Gerencie os serviços oferecidos pela barbearia.</p>

      <div className="ajustes-tabela-card">
        <table className="ajustes-tabela">
          <thead>
            <tr>
              <th>#</th>
              <th>Serviço</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {servicos.length === 0 && (
              <tr><td colSpan={3} className="ajustes-vazio">Nenhum serviço cadastrado.</td></tr>
            )}
            {servicos.map((s) => (
              <tr key={s.srvCodigo}>
                <td className="ajustes-id">{s.srvCodigo}</td>
                <td>{s.srvNome}</td>
                <td>
                  {Number(s.srvPreco).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ajustes-form-card">
        <h3>Adicionar serviço</h3>
        <div className="ajustes-form-row">
          <div className="ajustes-campo">
            <label>Nome do serviço</label>
            <input
              type="text"
              placeholder="Ex: Corte de Cabelo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="ajustes-campo ajustes-campo-preco">
            <label>Preço (R$)</label>
            <input
              type="text"
              placeholder="Ex: 45,00"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>
          <button
            className="ajustes-btn-add"
            onClick={adicionar}
            disabled={salvando}
          >
            <Plus size={16} />
            {salvando ? "Salvando..." : "Adicionar"}
          </button>
        </div>
        {erro && <p className="ajustes-erro">{erro}</p>}
        {mensagem && <p className="ajustes-sucesso">{mensagem}</p>}
      </div>
    </div>
  );
};

// ─── ABA EQUIPE ──────────────────────────────────────────────────────────────
const AbaEquipe = () => {
  const [barbeiros, setBarbeiros] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const carregar = () =>
    barbeiroApi.listar().then(setBarbeiros).catch(() => {});

  useEffect(() => {
    carregar();
  }, []);

  const adicionar = async () => {
    setErro("");
    setMensagem("");
    if (!nome.trim() || !email.trim() || !telefone.trim()) {
      setErro("Preencha nome, e-mail e telefone");
      return;
    }
    setSalvando(true);
    try {
      await barbeiroApi.criar({
        barNome: nome.trim(),
        barEmail: email.trim(),
        barTelefone: telefone.trim(),
        barEspecialidade: especialidade.trim() || "Geral",
        barAtivo: true,
      });
      setNome(""); setEmail(""); setTelefone(""); setEspecialidade("");
      setMensagem("Barbeiro adicionado com sucesso");
      carregar();
    } catch {
      setErro("Falha ao adicionar barbeiro");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="ajustes-secao">
      <h2 className="ajustes-titulo-secao">
        <Users size={18} /> Equipe
      </h2>
      <p className="ajustes-desc">Visualize e cadastre os profissionais da barbearia.</p>

      <div className="ajustes-tabela-card">
        <table className="ajustes-tabela">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Especialidade</th>
              <th>E-mail</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {barbeiros.length === 0 && (
              <tr><td colSpan={5} className="ajustes-vazio">Nenhum barbeiro cadastrado.</td></tr>
            )}
            {barbeiros.map((b) => (
              <tr key={b.barCodigo}>
                <td className="ajustes-id">{b.barCodigo}</td>
                <td>{b.barNome}</td>
                <td>{b.barEspecialidade}</td>
                <td>{b.barEmail}</td>
                <td>
                  <span className={b.barAtivo ? "ajustes-badge-ativo" : "ajustes-badge-inativo"}>
                    {b.barAtivo ? "Ativo" : "Inativo"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ajustes-form-card">
        <h3>Adicionar barbeiro</h3>
        <div className="ajustes-form-grid">
          <div className="ajustes-campo">
            <label>Nome</label>
            <input type="text" placeholder="Ex: Rafael Souza" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="ajustes-campo">
            <label>E-mail</label>
            <input type="email" placeholder="rafael@barbearia.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="ajustes-campo">
            <label>Telefone</label>
            <input type="tel" placeholder="(31) 99999-9999" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </div>
          <div className="ajustes-campo">
            <label>Especialidade</label>
            <input type="text" placeholder="Ex: Corte e Barba" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} />
          </div>
        </div>
        <button className="ajustes-btn-add" onClick={adicionar} disabled={salvando} style={{ marginTop: "12px" }}>
          <Plus size={16} />
          {salvando ? "Salvando..." : "Adicionar"}
        </button>
        {erro && <p className="ajustes-erro">{erro}</p>}
        {mensagem && <p className="ajustes-sucesso">{mensagem}</p>}
      </div>
    </div>
  );
};

// ─── ABA AGENDA ──────────────────────────────────────────────────────────────
const AbaAgenda = () => {
  const [barbeiros, setBarbeiros] = useState([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState(null);
  const [dias, setDias] = useState([]);
  const [inicio, setInicio] = useState("09:00");
  const [fim, setFim] = useState("18:00");
  const [intervalo, setIntervalo] = useState(30);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    barbeiroApi.listar().then((lista) => {
      setBarbeiros(lista);
      if (lista.length) setBarbeiroSelecionado(lista[0]);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!barbeiroSelecionado) return;
    setCarregando(true);
    setMensagem("");
    setErro("");
    configuracaoAgendaApi
      .porBarbeiro(barbeiroSelecionado.barCodigo)
      .then((cfg) => {
        setDias(parseDias(cfg.cfgDias));
        setInicio(String(cfg.cfgHorarioInicio).slice(0, 5));
        setFim(String(cfg.cfgHorarioFim).slice(0, 5));
        setIntervalo(cfg.cfgIntervalo || 30);
      })
      .catch(() => {
        setDias([]);
        setInicio("09:00");
        setFim("18:00");
        setIntervalo(30);
      })
      .finally(() => setCarregando(false));
  }, [barbeiroSelecionado]);

  const toggleDia = (id) => {
    setDias((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const salvar = async () => {
    setErro("");
    setMensagem("");
    if (dias.length === 0) { setErro("Selecione ao menos um dia"); return; }
    if (!inicio || !fim) { setErro("Informe os horários de início e fim"); return; }
    if (intervalo < 10) { setErro("O intervalo mínimo é 10 minutos"); return; }
    if (inicio >= fim) { setErro("O horário de início deve ser anterior ao fim"); return; }

    setSalvando(true);
    try {
      await configuracaoAgendaApi.salvar({
        barCodigo: barbeiroSelecionado.barCodigo,
        cfgDias: formataDias(dias),
        cfgHorarioInicio: inicio + ":00",
        cfgHorarioFim: fim + ":00",
        cfgIntervalo: intervalo,
      });
      setMensagem("Configuração salva com sucesso");
    } catch {
      setErro("Falha ao salvar configuração");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="ajustes-secao">
      <h2 className="ajustes-titulo-secao">
        <CalendarDays size={18} /> Configuração de Agenda
      </h2>
      <p className="ajustes-desc">
        Defina os dias e horários de atendimento de cada profissional.
      </p>

      <div className="ajustes-form-card">
        <div className="ajustes-campo" style={{ marginBottom: "20px" }}>
          <label>Profissional</label>
          <select
            value={barbeiroSelecionado?.barCodigo || ""}
            onChange={(e) =>
              setBarbeiroSelecionado(
                barbeiros.find((b) => b.barCodigo === Number(e.target.value))
              )
            }
          >
            {barbeiros.map((b) => (
              <option key={b.barCodigo} value={b.barCodigo}>
                {b.barNome} — {b.barEspecialidade}
              </option>
            ))}
          </select>
        </div>

        {carregando ? (
          <p className="ajustes-desc">Carregando configuração...</p>
        ) : (
          <>
            <div className="ajustes-campo">
              <label>Dias de atendimento</label>
              <div className="ajustes-dias-grid">
                {DIAS_SEMANA.map((dia) => (
                  <button
                    key={dia.id}
                    type="button"
                    className={`ajustes-dia-btn ${dias.includes(dia.id) ? "ajustes-dia-ativo" : ""}`}
                    onClick={() => toggleDia(dia.id)}
                  >
                    {dias.includes(dia.id) && <Check size={12} strokeWidth={3} />}
                    {dia.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ajustes-form-row" style={{ marginTop: "20px" }}>
              <div className="ajustes-campo">
                <label>Horário de início</label>
                <input
                  type="time"
                  value={inicio}
                  onChange={(e) => setInicio(e.target.value)}
                />
              </div>
              <div className="ajustes-campo">
                <label>Horário de fim</label>
                <input
                  type="time"
                  value={fim}
                  onChange={(e) => setFim(e.target.value)}
                />
              </div>
              <div className="ajustes-campo ajustes-campo-preco">
                <label>Intervalo entre atendimentos (min)</label>
                <input
                  type="number"
                  min={10}
                  step={5}
                  value={intervalo}
                  onChange={(e) => setIntervalo(Number(e.target.value))}
                />
              </div>
            </div>

            {erro && <p className="ajustes-erro">{erro}</p>}
            {mensagem && <p className="ajustes-sucesso">{mensagem}</p>}

            <div className="ajustes-acoes">
              <button
                className="ajustes-btn-salvar"
                onClick={salvar}
                disabled={salvando}
              >
                <Save size={16} />
                {salvando ? "Salvando..." : "Salvar Configurações"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── COMPONENTE PRINCIPAL ────────────────────────────────────────────────────
const Ajustes = () => {
  const [aba, setAba] = useState("servicos");

  return (
    <>
      <Header />
      <MenuLateral />
      <div className="ajustes-container">
        <div className="ajustes-content">
          <div className="ajustes-topo">
            <h1>Ajustes</h1>
            <p>Configurações gerais do sistema da barbearia</p>
          </div>

          <div className="ajustes-tabs">
            <button
              className={`ajustes-tab ${aba === "servicos" ? "ajustes-tab-ativa" : ""}`}
              onClick={() => setAba("servicos")}
            >
              <Scissors size={16} />
              Serviços
            </button>
            <button
              className={`ajustes-tab ${aba === "equipe" ? "ajustes-tab-ativa" : ""}`}
              onClick={() => setAba("equipe")}
            >
              <Users size={16} />
              Equipe
            </button>
            <button
              className={`ajustes-tab ${aba === "agenda" ? "ajustes-tab-ativa" : ""}`}
              onClick={() => setAba("agenda")}
            >
              <CalendarDays size={16} />
              Agenda
            </button>
          </div>

          <div className="ajustes-painel">
            {aba === "servicos" && <AbaServicos />}
            {aba === "equipe"   && <AbaEquipe />}
            {aba === "agenda"   && <AbaAgenda />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ajustes;
