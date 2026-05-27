// pages/AvaliacaoCliente.jsx

import { useState } from 'react';

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

const AvaliacaoCliente = () => {
  const [nota, setNota] = useState(2);

  const [comentario, setComentario] = useState('');

  const [avaliacaoExistente, setAvaliacaoExistente] =
    useState({
      nome: 'João Cliente',
      nota: 4,
      data: '16 de Maio, 2026 às 09:15',
      comentario:
        'Ótimo atendimento como sempre. O Marcos é um excelente profissional e o ambiente da barbearia estava muito limpo. A única ressalva foi o atraso de 10 minutos para iniciar.',
    });

  const enviarAvaliacao = () => {
    const novaAvaliacao = {
      nota,
      comentario,
      data: new Date(),
    };

    console.log('Enviar para API:', novaAvaliacao);

    alert('Avaliação enviada com sucesso!');
  };

  const editarAvaliacao = () => {
    setNota(avaliacaoExistente.nota);

    setComentario(avaliacaoExistente.comentario);
  };

  const excluirAvaliacao = () => {
    setAvaliacaoExistente(null);
  };

  return (
    <>
    <Header />
    <MenuLateral />
    <div className="avaliacao-container">
      {/* TOPO */}
      <div className="servico-card">
        <div>
          <span className="servico-label">
            SERVIÇO REALIZADO
          </span>

          <h1>Corte de Cabelo + Barba</h1>

          <div className="servico-info">
            <span>
              <CalendarDays size={18} />
              15 de Maio, 2026
            </span>

            <span>
              <Clock3 size={18} />
              14:30
            </span>

            <span>
              <Scissors size={18} />
              Profissional: Marcos Silva
            </span>
          </div>
        </div>

        <div className="valor-total">
          <span>Valor Total</span>

          <h2>R$ 80,00</h2>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="avaliacao-content">
        {/* FORM */}
        <div className="avaliacao-form-card">
          <h2>Sua Avaliação</h2>

          <p>
            Como foi sua experiência com este serviço?
          </p>

          <div className="divider" />

          <div className="campo-avaliacao">
            <label>
              Como você avalia o serviço?
            </label>

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
                    fill={
                      star <= nota
                        ? '#4b5563'
                        : 'transparent'
                    }
                    color={
                      star <= nota
                        ? '#4b5563'
                        : '#d1d5db'
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="campo-comentario">
            <label>
              Deixe um Comentário (opcional)
            </label>

            <textarea
              placeholder="Conte-nos como foi a sua experiência..."
              value={comentario}
              onChange={(e) =>
                setComentario(e.target.value)
              }
            />
          </div>

          <button
            className="btn-enviar"
            onClick={enviarAvaliacao}
          >
            Enviar Avaliação
          </button>
        </div>

        {/* AVALIAÇÃO EXISTENTE */}
        <div className="avaliacao-existente-card">
          <span className="existing-label">
            AVALIAÇÃO EXISTENTE
          </span>

          {avaliacaoExistente && (
            <>
              <div className="existing-header">
                <div>
                  <h3>
                    {avaliacaoExistente.nome}
                  </h3>

                  <p>
                    {avaliacaoExistente.data}
                  </p>
                </div>

                <div className="nota-box">
                  <div className="stars-mini">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={15}
                        fill={
                          star <=
                          avaliacaoExistente.nota
                            ? '#111827'
                            : 'transparent'
                        }
                      />
                    ))}
                  </div>

                  <span>
                    {avaliacaoExistente.nota}.0
                  </span>
                </div>
              </div>

              <div className="comentario-box">
                "
                {
                  avaliacaoExistente.comentario
                }
                "
              </div>

              <div className="acoes-avaliacao">
                <button
                  className="btn-editar"
                  onClick={editarAvaliacao}
                >
                  Editar Avaliação
                </button>

                <button
                  className="btn-excluir"
                  onClick={excluirAvaliacao}
                >
                  <Trash2 size={22} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AvaliacaoCliente;