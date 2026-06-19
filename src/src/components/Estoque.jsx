import { useEffect, useMemo, useState } from "react";
import "./Estoque.css";
import Header from "./Header";
import Footer from "./Footer";
import MenuLateral from "./MenuLateral";
import {
  AlertTriangle,
  Plus,
  Check,
  Search,
  Pencil,
  Trash2,
  X,
  RefreshCw,
} from "lucide-react";
import { materialApi } from "../services/api.js";

const ITENS_POR_PAGINA = 5;

const formatarQtd = (qtd, unidade) => `${Number(qtd ?? 0)} ${unidade || ""}`.trim();

const formatarMoeda = (valor) =>
  Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Regra de status: Adequado (>= minimo); Critico (<= 50% do minimo); Atencao (entre os dois).
const statusDe = (material) => {
  const q = Number(material.matQuantidade ?? 0);
  const m = Number(material.matQuantidadeMinima ?? 0);
  if (m <= 0 || q >= m) return { chave: "adequado", label: "Adequado" };
  if (q <= m * 0.5) return { chave: "critico", label: "Crítico" };
  return { chave: "atencao", label: "Atenção" };
};

const formVazio = {
  matNome: "",
  matReferencia: "",
  matCategoria: "",
  matUnidade: "un",
  matQuantidade: "",
  matQuantidadeMinima: "",
};

const Estoque = () => {
  const [materiais, setMateriais] = useState([]);
  const [atualizando, setAtualizando] = useState(false);

  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [ignorados, setIgnorados] = useState([]);

  // Formulario de uso (baixa)
  const [usoMaterial, setUsoMaterial] = useState("");
  const [usoQtd, setUsoQtd] = useState("");
  const [usoObs, setUsoObs] = useState("");
  const [usoMsg, setUsoMsg] = useState("");
  const [usoErro, setUsoErro] = useState("");

  // Formulario de reposicao
  const [repoMaterial, setRepoMaterial] = useState("");
  const [repoQtd, setRepoQtd] = useState("");
  const [repoCusto, setRepoCusto] = useState("");
  const [repoFornecedor, setRepoFornecedor] = useState("");
  const [repoMsg, setRepoMsg] = useState("");
  const [repoErro, setRepoErro] = useState("");

  // Modal novo/editar
  const [modalAberto, setModalAberto] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(formVazio);
  const [modalErro, setModalErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const carregar = () => {
    setAtualizando(true);
    return materialApi
      .listar()
      .then(setMateriais)
      .catch(() => {})
      .finally(() => setAtualizando(false));
  };

  useEffect(() => {
    carregar();
  }, []);

  const alertas = useMemo(
    () =>
      materiais
        .filter((m) => statusDe(m).chave !== "adequado")
        .filter((m) => !ignorados.includes(m.matCodigo)),
    [materiais, ignorados]
  );

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return materiais;
    return materiais.filter(
      (m) =>
        (m.matNome || "").toLowerCase().includes(termo) ||
        (m.matReferencia || "").toLowerCase().includes(termo) ||
        (m.matCategoria || "").toLowerCase().includes(termo)
    );
  }, [materiais, busca]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / ITENS_POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const visiveis = filtrados.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  useEffect(() => {
    setPagina(1);
  }, [busca]);

  const registrarBaixa = async () => {
    setUsoErro("");
    setUsoMsg("");
    if (!usoMaterial) { setUsoErro("Selecione um material"); return; }
    const qtd = Number(String(usoQtd).replace(",", "."));
    if (!qtd || qtd <= 0) { setUsoErro("Informe uma quantidade válida"); return; }
    try {
      await materialApi.registrarBaixa(usoMaterial, { quantidade: qtd, observacao: usoObs });
      setUsoMsg("Baixa registrada");
      setUsoQtd("");
      setUsoObs("");
      carregar();
    } catch (e) {
      setUsoErro(e.message || "Falha ao registrar baixa");
    }
  };

  const confirmarReposicao = async () => {
    setRepoErro("");
    setRepoMsg("");
    if (!repoMaterial) { setRepoErro("Selecione um material"); return; }
    const qtd = Number(String(repoQtd).replace(",", "."));
    if (!qtd || qtd <= 0) { setRepoErro("Informe uma quantidade válida"); return; }
    try {
      await materialApi.repor(repoMaterial, {
        quantidade: qtd,
        custo: repoCusto ? Number(String(repoCusto).replace(",", ".")) : null,
        fornecedor: repoFornecedor,
      });
      setRepoMsg("Reposição confirmada");
      setRepoQtd("");
      setRepoCusto("");
      setRepoFornecedor("");
      carregar();
    } catch (e) {
      setRepoErro(e.message || "Falha ao repor estoque");
    }
  };

  const reporPeloAlerta = (material) => {
    setRepoMaterial(String(material.matCodigo));
    setRepoMsg("");
    setRepoErro("");
    document.getElementById("card-reposicao")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const abrirNovo = () => {
    setEditId(null);
    setForm(formVazio);
    setModalErro("");
    setModalAberto(true);
  };

  const abrirEdicao = (m) => {
    setEditId(m.matCodigo);
    setForm({
      matNome: m.matNome || "",
      matReferencia: m.matReferencia || "",
      matCategoria: m.matCategoria || "",
      matUnidade: m.matUnidade || "un",
      matQuantidade: m.matQuantidade ?? "",
      matQuantidadeMinima: m.matQuantidadeMinima ?? "",
    });
    setModalErro("");
    setModalAberto(true);
  };

  const salvarMaterial = async () => {
    setModalErro("");
    if (!form.matNome.trim()) { setModalErro("Informe o nome do material"); return; }
    const payload = {
      matNome: form.matNome.trim(),
      matReferencia: form.matReferencia.trim(),
      matCategoria: form.matCategoria.trim() || "Geral",
      matUnidade: form.matUnidade.trim() || "un",
      matQuantidade: form.matQuantidade === "" ? 0 : Number(String(form.matQuantidade).replace(",", ".")),
      matQuantidadeMinima: form.matQuantidadeMinima === "" ? 0 : Number(String(form.matQuantidadeMinima).replace(",", ".")),
    };
    setSalvando(true);
    try {
      if (editId) await materialApi.atualizar(editId, payload);
      else await materialApi.criar(payload);
      setModalAberto(false);
      carregar();
    } catch (e) {
      setModalErro(e.message || "Falha ao salvar material");
    } finally {
      setSalvando(false);
    }
  };

  const excluirMaterial = async () => {
    if (!editId) return;
    if (!window.confirm(`Excluir o material "${form.matNome}"?`)) return;
    setSalvando(true);
    try {
      await materialApi.remover(editId);
      setModalAberto(false);
      carregar();
    } catch (e) {
      setModalErro(e.message || "Falha ao excluir material");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <>
      <Header />
      <div className="estoque-page">
        <MenuLateral />
        <main className="estoque-main">
          <div className="estoque-topo">
            <div>
              <h1>Gestão de Estoque</h1>
              <p>Controle de materiais e insumos da barbearia.</p>
            </div>
            <div className="estoque-topo-acoes">
              <button className="estoque-btn-atualizar" onClick={carregar} disabled={atualizando}>
                <RefreshCw size={15} className={atualizando ? "girando" : ""} />
                {atualizando ? "Atualizando" : "Atualizar"}
              </button>
              <button className="estoque-btn-primario" onClick={abrirNovo}>
                <Plus size={16} /> Novo Material
              </button>
            </div>
          </div>

          {alertas.length > 0 && (
            <>
              <h2 className="estoque-secao-titulo">
                <AlertTriangle size={18} /> Alertas de Estoque Baixo
              </h2>
              <div className="estoque-alertas">
                {alertas.map((m) => {
                  const st = statusDe(m);
                  return (
                    <div key={m.matCodigo} className={`estoque-alerta estoque-alerta-${st.chave}`}>
                      <div className="estoque-alerta-topo">
                        <div>
                          <h3>{m.matNome}</h3>
                          <span className="estoque-ref">Ref: {m.matReferencia}</span>
                        </div>
                        <span className={`estoque-badge estoque-badge-${st.chave}`}>{st.label}</span>
                      </div>
                      <p className="estoque-alerta-qtd">
                        Quantidade Restante: <strong>{formatarQtd(m.matQuantidade, m.matUnidade)}</strong>
                      </p>
                      <p className="estoque-alerta-min">
                        Mínimo recomendado: {formatarQtd(m.matQuantidadeMinima, m.matUnidade)}
                      </p>
                      <div className="estoque-alerta-acoes">
                        <button className="estoque-btn-primario" onClick={() => reporPeloAlerta(m)}>Repor</button>
                        <button className="estoque-btn-secundario" onClick={() => setIgnorados((p) => [...p, m.matCodigo])}>
                          Ignorar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="estoque-formularios">
            <section className="estoque-card">
              <h2>Registrar Uso de Material</h2>
              <p className="estoque-card-sub">Dê baixa em materiais utilizados no dia a dia.</p>

              <label className="estoque-label">Material Utilizado</label>
              <select value={usoMaterial} onChange={(e) => setUsoMaterial(e.target.value)}>
                <option value="">Selecione um material...</option>
                {materiais.map((m) => (
                  <option key={m.matCodigo} value={m.matCodigo}>
                    {m.matNome} ({formatarQtd(m.matQuantidade, m.matUnidade)})
                  </option>
                ))}
              </select>

              <label className="estoque-label">Quantidade</label>
              <input type="number" min="0" placeholder="Ex: 5" value={usoQtd} onChange={(e) => setUsoQtd(e.target.value)} />

              <label className="estoque-label">Observações (Opcional)</label>
              <textarea
                placeholder="Motivo ou cliente relacionado..."
                value={usoObs}
                onChange={(e) => setUsoObs(e.target.value)}
              />

              {usoErro && <p className="estoque-erro">{usoErro}</p>}
              {usoMsg && <p className="estoque-sucesso">{usoMsg}</p>}

              <button className="estoque-btn-bloco" onClick={registrarBaixa}>Registrar Baixa</button>
            </section>

            <section className="estoque-card" id="card-reposicao">
              <h2>Reposição de Estoque</h2>
              <p className="estoque-card-sub">Adicione novos itens ao inventário atual.</p>

              <label className="estoque-label">Material</label>
              <select value={repoMaterial} onChange={(e) => setRepoMaterial(e.target.value)}>
                <option value="">Selecione o material para repor...</option>
                {materiais.map((m) => (
                  <option key={m.matCodigo} value={m.matCodigo}>
                    {m.matNome} ({formatarQtd(m.matQuantidade, m.matUnidade)})
                  </option>
                ))}
              </select>

              <div className="estoque-form-linha">
                <div>
                  <label className="estoque-label">Qtd. a Adicionar</label>
                  <input type="number" min="0" placeholder="Ex: 100" value={repoQtd} onChange={(e) => setRepoQtd(e.target.value)} />
                </div>
                <div>
                  <label className="estoque-label">Custo Total (R$)</label>
                  <input type="text" placeholder="0,00" value={repoCusto} onChange={(e) => setRepoCusto(e.target.value)} />
                </div>
              </div>

              <label className="estoque-label">Fornecedor</label>
              <input type="text" placeholder="Nome do fornecedor..." value={repoFornecedor} onChange={(e) => setRepoFornecedor(e.target.value)} />

              {repoErro && <p className="estoque-erro">{repoErro}</p>}
              {repoMsg && <p className="estoque-sucesso">{repoMsg}</p>}

              <button className="estoque-btn-bloco" onClick={confirmarReposicao}>
                <Check size={16} /> Confirmar Reposição
              </button>
            </section>
          </div>

          <section className="estoque-card estoque-tabela-card">
            <div className="estoque-tabela-header">
              <h2>Visão Geral do Estoque</h2>
              <div className="estoque-busca">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Buscar material..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
            </div>

            <table className="estoque-tabela">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>CATEGORIA</th>
                  <th>QTD. ATUAL</th>
                  <th>STATUS</th>
                  <th className="estoque-col-acoes">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {visiveis.length === 0 && (
                  <tr>
                    <td colSpan={5} className="estoque-vazio">
                      {atualizando ? "Carregando..." : "Nenhum material encontrado."}
                    </td>
                  </tr>
                )}
                {visiveis.map((m) => {
                  const st = statusDe(m);
                  return (
                    <tr key={m.matCodigo}>
                      <td>
                        <div className="estoque-item-nome">{m.matNome}</div>
                        <div className="estoque-ref">Ref: {m.matReferencia}</div>
                      </td>
                      <td>{m.matCategoria}</td>
                      <td className={st.chave === "critico" ? "estoque-qtd-critica" : ""}>
                        {formatarQtd(m.matQuantidade, m.matUnidade)}
                      </td>
                      <td>
                        <span className={`estoque-badge estoque-badge-${st.chave}`}>{st.label}</span>
                      </td>
                      <td className="estoque-col-acoes">
                        <button className="estoque-btn-icone" onClick={() => abrirEdicao(m)} title="Editar">
                          <Pencil size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="estoque-tabela-rodape">
              <span>
                Exibindo {visiveis.length ? (paginaAtual - 1) * ITENS_POR_PAGINA + 1 : 0} a{" "}
                {(paginaAtual - 1) * ITENS_POR_PAGINA + visiveis.length} de {filtrados.length} itens
              </span>
              <div className="estoque-paginacao">
                <button onClick={() => setPagina((p) => Math.max(1, p - 1))} disabled={paginaAtual <= 1}>‹</button>
                <span className="estoque-pagina-atual">{paginaAtual} / {totalPaginas}</span>
                <button onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))} disabled={paginaAtual >= totalPaginas}>›</button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {modalAberto && (
        <div className="estoque-modal-overlay" onClick={() => setModalAberto(false)}>
          <div className="estoque-modal" onClick={(e) => e.stopPropagation()}>
            <div className="estoque-modal-topo">
              <h2>{editId ? "Editar Material" : "Novo Material"}</h2>
              <button className="estoque-btn-icone" onClick={() => setModalAberto(false)}><X size={18} /></button>
            </div>

            <label className="estoque-label">Nome do material</label>
            <input value={form.matNome} onChange={(e) => setForm({ ...form, matNome: e.target.value })} placeholder="Ex: Pomada Modeladora" />

            <div className="estoque-form-linha">
              <div>
                <label className="estoque-label">Referência</label>
                <input value={form.matReferencia} onChange={(e) => setForm({ ...form, matReferencia: e.target.value })} placeholder="Ex: PM-10" />
              </div>
              <div>
                <label className="estoque-label">Categoria</label>
                <input value={form.matCategoria} onChange={(e) => setForm({ ...form, matCategoria: e.target.value })} placeholder="Ex: Finalizadores" />
              </div>
            </div>

            <div className="estoque-form-linha">
              <div>
                <label className="estoque-label">Unidade</label>
                <input value={form.matUnidade} onChange={(e) => setForm({ ...form, matUnidade: e.target.value })} placeholder="un, L, ml..." />
              </div>
              <div>
                <label className="estoque-label">Qtd. atual</label>
                <input type="number" min="0" value={form.matQuantidade} onChange={(e) => setForm({ ...form, matQuantidade: e.target.value })} placeholder="0" />
              </div>
              <div>
                <label className="estoque-label">Qtd. mínima</label>
                <input type="number" min="0" value={form.matQuantidadeMinima} onChange={(e) => setForm({ ...form, matQuantidadeMinima: e.target.value })} placeholder="0" />
              </div>
            </div>

            {modalErro && <p className="estoque-erro">{modalErro}</p>}

            <div className="estoque-modal-acoes">
              {editId && (
                <button className="estoque-btn-perigo" onClick={excluirMaterial} disabled={salvando}>
                  <Trash2 size={15} /> Excluir
                </button>
              )}
              <div className="estoque-modal-acoes-dir">
                <button className="estoque-btn-secundario" onClick={() => setModalAberto(false)} disabled={salvando}>Cancelar</button>
                <button className="estoque-btn-primario" onClick={salvarMaterial} disabled={salvando}>
                  {salvando ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Estoque;
