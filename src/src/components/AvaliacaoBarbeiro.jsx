import { useEffect, useMemo, useState } from 'react';

import './AvaliacaoBarbeiro.css';
import Header from './Header';
import Footer from './Footer';
import MenuLateral from './MenuLateral';

import { RefreshCw, Star, Search } from 'lucide-react';

import {
  avaliacaoApi,
  agendamentoApi,
  servicoApi,
  clienteApi,
} from '../services/api.js';

const AvaliacaoBarbeiro = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const [filtroPeriodo, setFiltroPeriodo] = useState('30dias');
  const [filtroServico, setFiltroServico] = useState('todos');
  const [filtroNota, setFiltroNota] = useState('todas');
  const [ordenacao, setOrdenacao] = useState('recentes');
  const [busca, setBusca] = useState('');

  const carregarDados = () => {
    setCarregando(true);
    Promise.all([
      avaliacaoApi.listar(),
      agendamentoApi.listar(),
      servicoApi.listar(),
      clienteApi.listar(),
    ])
      .then(([avs, agds, srvs, clis]) => {
        const mapaAgd = {};
        agds.forEach((a) => (mapaAgd[a.agdCodigo] = a));
        const mapaServico = {};
        srvs.forEach((s) => (mapaServico[s.srvCodigo] = s.srvNome));
        const mapaCliente = {};
        clis.forEach((c) => (mapaCliente[c.cliCodigo] = c.cliNome));

        const enriquecidas = avs.map((av) => {
          const agd = mapaAgd[av.agdCodigo];
          const nomeServico = agd ? (mapaServico[agd.srvCodigo] || 'Serviço') : 'Serviço';
          const nomeCliente = agd ? (mapaCliente[agd.cliCodigo] || 'Cliente') : 'Cliente';
          const iniciais = nomeCliente
            .split(' ')
            .slice(0, 2)
            .map((p) => p[0])
            .join('')
            .toUpperCase();

          return {
            id: av.avaCodigo,
            nome: nomeCliente,
            iniciais,
            servico: nomeServico,
            nota: av.avaNota,
            comentario: av.avaComentario || '',
            dataRaw: av.avaData ? new Date(av.avaData) : null,
            data: av.avaData
              ? new Date(av.avaData).toLocaleDateString('pt-BR')
              : '',
          };
        });

        setAvaliacoes(enriquecidas);
      })
      .catch(() => {})
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const mediaGeral = useMemo(() => {
    if (!avaliacoes.length) return '0.0';
    const total = avaliacoes.reduce((acc, item) => acc + item.nota, 0);
    return (total / avaliacoes.length).toFixed(1);
  }, [avaliacoes]);

  const distribuicaoNotas = useMemo(() => {
    return [5, 4, 3, 2, 1].map((nota) => ({
      nota,
      quantidade: avaliacoes.filter((item) => item.nota === nota).length,
    }));
  }, [avaliacoes]);

  const servicosUnicos = useMemo(() => {
    return [...new Set(avaliacoes.map((a) => a.servico))];
  }, [avaliacoes]);

  const avaliacoesFiltradas = useMemo(() => {
    let resultado = [...avaliacoes];

    const diasPeriodo = { '7dias': 7, '30dias': 30, '90dias': 90 }[filtroPeriodo];
    if (diasPeriodo) {
      const limite = new Date();
      limite.setHours(0, 0, 0, 0);
      limite.setDate(limite.getDate() - (diasPeriodo - 1));
      resultado = resultado.filter(
        (item) => item.dataRaw && item.dataRaw >= limite
      );
    }

    if (filtroServico !== 'todos') {
      resultado = resultado.filter((item) => item.servico === filtroServico);
    }

    if (filtroNota !== 'todas') {
      resultado = resultado.filter((item) => item.nota === Number(filtroNota));
    }

    if (busca.trim()) {
      resultado = resultado.filter(
        (item) =>
          item.nome.toLowerCase().includes(busca.toLowerCase()) ||
          item.servico.toLowerCase().includes(busca.toLowerCase())
      );
    }

    if (ordenacao === 'maior') resultado.sort((a, b) => b.nota - a.nota);
    else if (ordenacao === 'menor') resultado.sort((a, b) => a.nota - b.nota);
    else resultado.sort((a, b) => (b.dataRaw?.getTime() || 0) - (a.dataRaw?.getTime() || 0));

    return resultado;
  }, [avaliacoes, filtroPeriodo, filtroServico, filtroNota, busca, ordenacao]);

  return (
    <>
      <Header />
      <div className="avaliacoes-container">
        <MenuLateral />

        <div className="avaliacoes-topbar">
          <h1>Avaliações</h1>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Buscar..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <button
              onClick={carregarDados}
              disabled={carregando}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                background: '#fff',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              <RefreshCw size={14} className={carregando ? 'girando' : ''} />
              {carregando ? 'Atualizando' : 'Atualizar'}
            </button>
          </div>
        </div>

        <div className="avaliacoes-resumo">
          <div className="media-card">
            <span>Média Geral</span>
            <div className="media-content">
              <h2>{mediaGeral}</h2>
              <Star size={32} fill="#9ca3af" color="#9ca3af" />
            </div>
            <p>Baseado em {avaliacoes.length} avaliações</p>
          </div>

          <div className="distribuicao-card">
            <h3>Distribuição de Notas</h3>
            {distribuicaoNotas.map((item) => (
              <div key={item.nota} className="barra-item">
                <span>{item.nota} ★</span>
                <div className="barra-bg">
                  <div
                    className="barra-fill"
                    style={{
                      width: avaliacoes.length
                        ? `${(item.quantidade / avaliacoes.length) * 100}%`
                        : '0%',
                    }}
                  />
                </div>
                <span>{item.quantidade}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ultimas-card">
          <div className="ultimas-header">
            <h2>Últimas Avaliações</h2>
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
            >
              <option value="recentes">Mais recentes</option>
              <option value="maior">Maior nota</option>
              <option value="menor">Menor nota</option>
            </select>
          </div>

          <div className="avaliacoes-lista">
            {avaliacoesFiltradas.length === 0 && (
              <p style={{ color: '#6b7280', padding: '16px' }}>
                {carregando ? 'Carregando...' : 'Nenhuma avaliação encontrada.'}
              </p>
            )}
            {avaliacoesFiltradas.map((avaliacao) => (
              <div key={avaliacao.id} className="avaliacao-item">
                <div className="avatar">{avaliacao.iniciais}</div>

                <div className="avaliacao-info">
                  <div className="avaliacao-top">
                    <div>
                      <h3>{avaliacao.nome}</h3>
                      <span>
                        {avaliacao.data} • {avaliacao.servico}
                      </span>
                    </div>

                    <div className="stars-view">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          fill={star <= avaliacao.nota ? '#111827' : 'transparent'}
                          color="#111827"
                        />
                      ))}
                    </div>
                  </div>

                  {avaliacao.comentario && <p>{avaliacao.comentario}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="filtros-card">
          <h2>Filtros de Avaliação</h2>

          <div className="filtros-grid">
            <div className="campo-filtro">
              <label>Período</label>
              <select
                value={filtroPeriodo}
                onChange={(e) => setFiltroPeriodo(e.target.value)}
              >
                <option value="7dias">Últimos 7 dias</option>
                <option value="30dias">Últimos 30 dias</option>
                <option value="90dias">Últimos 90 dias</option>
              </select>
            </div>

            <div className="campo-filtro">
              <label>Serviço</label>
              <select
                value={filtroServico}
                onChange={(e) => setFiltroServico(e.target.value)}
              >
                <option value="todos">Todos os serviços</option>
                {servicosUnicos.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo-filtro">
              <label>Nota</label>
              <select
                value={filtroNota}
                onChange={(e) => setFiltroNota(e.target.value)}
              >
                <option value="todas">Todas</option>
                <option value="5">5 estrelas</option>
                <option value="4">4 estrelas</option>
                <option value="3">3 estrelas</option>
                <option value="2">2 estrelas</option>
                <option value="1">1 estrela</option>
              </select>
            </div>

            <button
              className="btn-filtrar"
              onClick={() => {
                setFiltroPeriodo('30dias');
                setFiltroServico('todos');
                setFiltroNota('todas');
                setBusca('');
              }}
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AvaliacaoBarbeiro;
