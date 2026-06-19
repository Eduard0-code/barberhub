import { useEffect, useState } from 'react';

import './AvaliacaoCliente.css';
import Header from './Header';
import Footer from './Footer';
import MenuLateral from './MenuLateral';

import {
  CalendarDays,
  Clock3,
  Scissors,
  Star,
  Trash2,
} from 'lucide-react';

import {
  agendamentoApi,
  avaliacaoApi,
  servicoApi,
  barbeiroApi,
  clienteApi,
  usuarioLogado,
} from '../services/api.js';

const formatarData = (data) => {
  if (!data) return '';
  const d = new Date(data);
  return d.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const formatarHora = (hora) => {
  if (!hora) return '';
  return String(hora).slice(0, 5);
};

const formatarMoeda = (valor) =>
  Number(valor || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

const AvaliacaoCliente = () => {
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [agendamento, setAgendamento] = useState(null);
  const [avaliacaoExistente, setAvaliacaoExistente] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [barbeiros, setBarbeiros] = useState([]);
  const [nomeCliente, setNomeCliente] = useState('Cliente');
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const logado = usuarioLogado();

  const carregar = async () => {
    try {
      const [listaServicos, listaBarbeiros] = await Promise.all([
        servicoApi.listar().catch(() => []),
        barbeiroApi.listar().catch(() => []),
      ]);
      setServicos(listaServicos);
      setBarbeiros(listaBarbeiros);

      let agendamentos = [];
      if (logado?.cliCodigo) {
        agendamentos = await agendamentoApi.porCliente(logado.cliCodigo).catch(() => []);
        setNomeCliente(logado.cliNome || 'Cliente');
      } else {
        agendamentos = await agendamentoApi.recentes().catch(() => []);
      }

      if (!agendamentos.length) {
        setAgendamento(null);
        return;
      }

      const ultimoConcluido = agendamentos.find((a) => a.agdStatus === 'Concluido') || agendamentos[0];
      setAgendamento(ultimoConcluido);

      if (!logado?.cliCodigo && ultimoConcluido.cliCodigo) {
        const clientes = await clienteApi.listar().catch(() => []);
        const cli = clientes.find((c) => c.cliCodigo === ultimoConcluido.cliCodigo);
        if (cli) setNomeCliente(cli.cliNome);
      }

      const av = await avaliacaoApi.porAgendamento(ultimoConcluido.agdCodigo).catch(() => null);
      if (av && av.avaCodigo) {
        setAvaliacaoExistente(av);
        setNota(av.avaNota);
        setComentario(av.avaComentario || '');
      } else {
        setAvaliacaoExistente(null);
        setNota(0);
        setComentario('');
      }
    } catch (e) {
      setErro('Não foi possível carregar os dados');
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const enviarAvaliacao = async () => {
    setErro('');
    setMensagem('');

    if (!agendamento) {
      setErro('Sem agendamento para avaliar');
      return;
    }
    if (nota < 1 || nota > 5) {
      setErro('Escolha uma nota de 1 a 5');
      return;
    }

    setCarregando(true);
    try {
      const salvo = await avaliacaoApi.criar({
        agdCodigo: agendamento.agdCodigo,
        avaNota: nota,
        avaComentario: comentario,
      });
      setAvaliacaoExistente(salvo);
      setMensagem('Avaliação enviada com sucesso');
    } catch (e) {
      setErro(e.message || 'Falha ao enviar avaliação');
    } finally {
      setCarregando(false);
    }
  };

  const editarAvaliacao = () => {
    if (!avaliacaoExistente) return;
    setNota(avaliacaoExistente.avaNota);
    setComentario(avaliacaoExistente.avaComentario || '');
  };

  const excluirAvaliacao = async () => {
    if (!avaliacaoExistente?.avaCodigo) {
      setAvaliacaoExistente(null);
      setNota(0);
      setComentario('');
      return;
    }
    setErro('');
    setMensagem('');
    setCarregando(true);
    try {
      await avaliacaoApi.remover(avaliacaoExistente.avaCodigo);
      setAvaliacaoExistente(null);
      setNota(0);
      setComentario('');
      setMensagem('Avaliação excluída');
    } catch (e) {
      setErro(e.message || 'Falha ao excluir avaliação');
    } finally {
      setCarregando(false);
    }
  };

  const nomeServico = agendamento
    ? servicos.find((s) => s.srvCodigo === agendamento.srvCodigo)?.srvNome || 'Serviço'
    : 'Serviço';

  const nomeBarbeiro = agendamento
    ? barbeiros.find((b) => b.barCodigo === agendamento.barCodigo)?.barNome || 'Profissional'
    : 'Profissional';

  return (
    <>
      <Header />
      <div className="avaliacao-container">
        <MenuLateral />

        <div className="servico-card">
          <div>
            <span className="servico-label">SERVIÇO REALIZADO</span>

            <h1>{nomeServico}</h1>

            <div className="servico-info">
              <span>
                <CalendarDays size={18} />
                {agendamento ? formatarData(agendamento.agdData) : 'Sem agendamento'}
              </span>

              <span>
                <Clock3 size={18} />
                {agendamento ? formatarHora(agendamento.agdHorario) : '--:--'}
              </span>

              <span>
                <Scissors size={18} />
                Profissional: {nomeBarbeiro}
              </span>
            </div>
          </div>

          <div className="valor-total">
            <span>Valor Total</span>
            <h2>{formatarMoeda(agendamento?.agdPreco)}</h2>
          </div>
        </div>

        <div className="avaliacao-content">
          <div className="avaliacao-form-card">
            <h2>Sua Avaliação</h2>
            <p>Como foi sua experiência com este serviço?</p>

            <div className="divider" />

            <div className="campo-avaliacao">
              <label>Como você avalia o serviço?</label>

              <div className="stars-box">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNota(star)}
                    className="star-button"
                  >
                    <Star
                      size={42}
                      fill={star <= nota ? '#4b5563' : 'transparent'}
                      color={star <= nota ? '#4b5563' : '#d1d5db'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="campo-comentario">
              <label>Deixe um Comentário (opcional)</label>

              <textarea
                placeholder="Conte-nos como foi a sua experiência..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </div>

            {erro && <p className="avaliacao-erro">{erro}</p>}
            {mensagem && <p className="avaliacao-sucesso">{mensagem}</p>}

            <button
              className="btn-enviar"
              onClick={enviarAvaliacao}
              disabled={carregando || !agendamento}
            >
              {carregando ? 'Enviando...' : 'Enviar Avaliação'}
            </button>
          </div>

          <div className="avaliacao-existente-card">
            <span className="existing-label">AVALIAÇÃO EXISTENTE</span>

            {avaliacaoExistente ? (
              <>
                <div className="existing-header">
                  <div>
                    <h3>{nomeCliente}</h3>
                    <p>
                      {avaliacaoExistente.avaData &&
                        new Date(avaliacaoExistente.avaData).toLocaleString('pt-BR')}
                    </p>
                  </div>

                  <div className="nota-box">
                    <div className="stars-mini">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={15}
                          fill={star <= avaliacaoExistente.avaNota ? '#111827' : 'transparent'}
                        />
                      ))}
                    </div>

                    <span>{avaliacaoExistente.avaNota}.0</span>
                  </div>
                </div>

                {avaliacaoExistente.avaComentario && (
                  <div className="comentario-box">"{avaliacaoExistente.avaComentario}"</div>
                )}

                <div className="acoes-avaliacao">
                  <button className="btn-editar" onClick={editarAvaliacao}>
                    Editar Avaliação
                  </button>

                  <button className="btn-excluir" onClick={excluirAvaliacao}>
                    <Trash2 size={22} />
                  </button>
                </div>
              </>
            ) : (
              <p className="sem-avaliacao">Nenhuma avaliação cadastrada para este agendamento.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AvaliacaoCliente;
