// pages/Avaliacoes.jsx

import { useMemo, useState } from 'react';

import './AvaliacaoBarbeiro.css';
import Header from './Header';
import Footer from './Footer';
import MenuLateral from './MenuLateral';

import {
  Star,
  Search,
} from 'lucide-react';

const AvaliacaoBarbeiro = () => {
  const [filtroPeriodo, setFiltroPeriodo] =
    useState('30dias');

  const [filtroServico, setFiltroServico] =
    useState('todos');

  const [filtroNota, setFiltroNota] =
    useState('todas');

  const [ordenacao, setOrdenacao] =
    useState('recentes');

  const [busca, setBusca] = useState('');

  // futuramente vem do backend
 const avaliacoes = useMemo(
  () => [
    {
      id: 1,
      nome: 'Marcos Costa',
      iniciais: 'MC',
      servico: 'Corte Degradê',
      nota: 5,
      comentario:
        'Excelente atendimento como sempre. O ambiente estava limpo e o corte ficou exatamente como eu pedi. Recomendo!',
      data: 'Há 2 horas',
    },

    {
      id: 2,
      nome: 'Roberto Santos',
      iniciais: 'RS',
      servico: 'Barba Terapia',
      nota: 4,
      comentario:
        'Muito bom o serviço de barba, produtos de qualidade. Só atrasou uns 10 minutos para me atender.',
      data: 'Ontem',
    },

    {
      id: 3,
      nome: 'Fernando Lima',
      iniciais: 'FL',
      servico: 'Corte Infantil',
      nota: 5,
      comentario:
        'Tiveram muita paciência com meu filho. Corte rápido e bem feito.',
      data: '12 Out 2023',
    },

    {
      id: 4,
      nome: 'Carlos Henrique',
      iniciais: 'CH',
      servico: 'Corte + Barba',
      nota: 5,
      comentario:
        'Atendimento impecável e ambiente muito agradável.',
      data: '10 Out 2023',
    },

    {
      id: 5,
      nome: 'Pedro Oliveira',
      iniciais: 'PO',
      servico: 'Pigmentação',
      nota: 3,
      comentario:
        'O resultado ficou bom, mas demorou bastante.',
      data: '08 Out 2023',
    },
  ],
  []
);

  // MÉDIA GERAL
  const mediaGeral = useMemo(() => {
    const total = avaliacoes.reduce(
      (acc, item) => acc + item.nota,
      0
    );

    return (
      total / avaliacoes.length
    ).toFixed(1);
  }, [avaliacoes]);

  // DISTRIBUIÇÃO
  const distribuicaoNotas = useMemo(() => {
    return [5, 4, 3, 2, 1].map((nota) => ({
      nota,
      quantidade: avaliacoes.filter(
        (item) => item.nota === nota
      ).length,
    }));
  }, [avaliacoes]);

  // FILTROS
  const avaliacoesFiltradas = useMemo(() => {
    let resultado = [...avaliacoes];

    // filtro serviço
    if (filtroServico !== 'todos') {
      resultado = resultado.filter(
        (item) =>
          item.servico === filtroServico
      );
    }

    // filtro nota
    if (filtroNota !== 'todas') {
      resultado = resultado.filter(
        (item) =>
          item.nota === Number(filtroNota)
      );
    }

    // busca
    if (busca.trim()) {
      resultado = resultado.filter(
        (item) =>
          item.nome
            .toLowerCase()
            .includes(
              busca.toLowerCase()
            ) ||
          item.servico
            .toLowerCase()
            .includes(
              busca.toLowerCase()
            )
      );
    }

    // ordenação
    if (ordenacao === 'maior') {
      resultado.sort(
        (a, b) => b.nota - a.nota
      );
    }

    if (ordenacao === 'menor') {
      resultado.sort(
        (a, b) => a.nota - b.nota
      );
    }

    return resultado;
  }, [
    avaliacoes,
    filtroServico,
    filtroNota,
    busca,
    ordenacao,
  ]);

  return (
    <>
    <Header />
    <div className="avaliacoes-container">
    <MenuLateral />
      {/* TOPBAR */}
      <div className="avaliacoes-topbar">
        <h1>Avaliações</h1>

        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Buscar..."
            value={busca}
            onChange={(e) =>
              setBusca(e.target.value)
            }
          />
        </div>
      </div>


      {/* RESUMO */}
      <div className="avaliacoes-resumo">
        {/* MÉDIA */}
        <div className="media-card">
          <span>Média Geral</span>

          <div className="media-content">
            <h2>{mediaGeral}</h2>

            <Star
              size={32}
              fill="#9ca3af"
              color="#9ca3af"
            />
          </div>

          <p>
            Baseado em{' '}
            {avaliacoes.length} avaliações
          </p>
        </div>

        {/* DISTRIBUIÇÃO */}
        <div className="distribuicao-card">
          <h3>Distribuição de Notas</h3>

          {distribuicaoNotas.map((item) => (
            <div
              key={item.nota}
              className="barra-item"
            >
              <span>{item.nota} ★</span>

              <div className="barra-bg">
                <div
                  className="barra-fill"
                  style={{
                    width: `${
                      (item.quantidade /
                        avaliacoes.length) *
                      100
                    }%`,
                  }}
                />
              </div>

              <span>{item.quantidade}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ÚLTIMAS AVALIAÇÕES */}
      <div className="ultimas-card">
        <div className="ultimas-header">
          <h2>Últimas Avaliações</h2>

          <select
            value={ordenacao}
            onChange={(e) =>
              setOrdenacao(
                e.target.value
              )
            }
          >
            <option value="recentes">
              Mais recentes
            </option>

            <option value="maior">
              Maior nota
            </option>

            <option value="menor">
              Menor nota
            </option>
          </select>
        </div>

        <div className="avaliacoes-lista">
          {avaliacoesFiltradas.map(
            (avaliacao) => (
              <div
                key={avaliacao.id}
                className="avaliacao-item"
              >
                <div className="avatar">
                  {avaliacao.iniciais}
                </div>

                <div className="avaliacao-info">
                  <div className="avaliacao-top">
                    <div>
                      <h3>
                        {avaliacao.nome}
                      </h3>

                      <span>
                        {avaliacao.data} •{' '}
                        {
                          avaliacao.servico
                        }
                      </span>
                    </div>

                    <div className="stars-view">
                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <Star
                            key={star}
                            size={16}
                            fill={
                              star <=
                              avaliacao.nota
                                ? '#111827'
                                : 'transparent'
                            }
                            color="#111827"
                          />
                        )
                      )}
                    </div>
                  </div>

                  <p>
                    {
                      avaliacao.comentario
                    }
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        <button className="btn-load-more">
          Carregar mais avaliações...
        </button>
      </div>

      {/* FILTROS */}
      <div className="filtros-card">
        <h2>Filtros de Avaliação</h2>

        <div className="filtros-grid">
          <div className="campo-filtro">
            <label>Período</label>

            <select
              value={filtroPeriodo}
              onChange={(e) =>
                setFiltroPeriodo(
                  e.target.value
                )
              }
            >
              <option value="7dias">
                Últimos 7 dias
              </option>

              <option value="30dias">
                Últimos 30 dias
              </option>

              <option value="90dias">
                Últimos 90 dias
              </option>
            </select>
          </div>

          <div className="campo-filtro">
            <label>Serviço</label>

            <select
              value={filtroServico}
              onChange={(e) =>
                setFiltroServico(
                  e.target.value
                )
              }
            >
              <option value="todos">
                Todos os serviços
              </option>

              <option value="Corte Degradê">
                Corte Degradê
              </option>

              <option value="Barba Terapia">
                Barba Terapia
              </option>

              <option value="Corte Infantil">
                Corte Infantil
              </option>
            </select>
          </div>

          <div className="campo-filtro">
            <label>Status</label>

            <select
              value={filtroNota}
              onChange={(e) =>
                setFiltroNota(
                  e.target.value
                )
              }
            >
              <option value="todas">
                Todas
              </option>

              <option value="5">
                5 estrelas
              </option>

              <option value="4">
                4 estrelas
              </option>

              <option value="3">
                3 estrelas
              </option>
            </select>
          </div>

          <button className="btn-filtrar">
            Filtrar
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AvaliacaoBarbeiro;