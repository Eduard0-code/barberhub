import { useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './AgendamentoCliente.css';
import Header from '../components/Header';
import MenuLateral from '../components/MenuLateral';
import Footer from '../components/Footer';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Scissors,
  User,
} from 'lucide-react';

const AgendamentoCliente = () => {
  const servicos = [
    {
      nome: 'Corte de Cabelo',
      descricao: 'Corte tradicional na tesoura ou máquina.',
      preco: 'R$ 45,00',
      duracao: '~40 min',
    },
    {
      nome: 'Barba Completa',
      descricao: 'Alinhamento, toalha quente e navalha.',
      preco: 'R$ 35,00',
      duracao: '~30 min',
    },
    {
      nome: 'Combo: Corte + Barba',
      descricao: 'Serviço completo com desconto especial.',
      preco: 'R$ 70,00',
      duracao: '~1h 10min',
    },
    {
      nome: 'Sobrancelha',
      descricao: 'Design de sobrancelha na navalha.',
      preco: 'R$ 15,00',
      duracao: '~15 min',
    },
  ];

  const horarios = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
  ];

  const [etapaAtual, setEtapaAtual] = useState(1);
  const [servicoSelecionado, setServicoSelecionado] = useState(servicos[1]);
  const [diaSelecionado, setDiaSelecionado] = useState(
    new Date()
  );
  const [month, setMonth] = useState(new Date());
  const [horarioSelecionado, setHorarioSelecionado] = useState('14:00');

  const total = useMemo(() => servicoSelecionado.preco, [servicoSelecionado]);

  const scrollPara = (id, etapa) => {
    setEtapaAtual(etapa);

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <Header />
    <div className="cliente-page">
      <MenuLateral/>
      <main className="cliente-main">
        <div className="steps-container sticky-steps">
          <div
            className={`step ${etapaAtual === 1 ? 'active-step' : ''}`}
            onClick={() => scrollPara('card-servico', 1)}
          >
            <div className="step-circle">1</div>
            <span>serviço</span>
          </div>

          <div
            className={`step ${etapaAtual === 2 ? 'active-step' : ''}`}
            onClick={() => scrollPara('card-horario', 2)}
          >
            <div className="step-circle">2</div>
            <span>Horário</span>
          </div>

          <div
            className={`step ${etapaAtual === 3 ? 'active-step' : ''}`}
            onClick={() => scrollPara('card-confirmacao', 3)}
          >
            <div className="step-circle">3</div>
            <span>Confirmação</span>
          </div>
        </div>

        <section className="cliente-card" id="card-servico">
          <div className="cliente-card-header">
            <div>
              <h1>Selecione o Serviço</h1>
              <p>Escolha um ou mais serviços para o seu agendamento.</p>
            </div>
          </div>

          <div className="services-container">
            {servicos.map((servico) => (
              <div
                key={servico.nome}
                className={`service-item ${
                  servicoSelecionado.nome === servico.nome
                    ? 'selected-service'
                    : ''
                }`}
                onClick={() => setServicoSelecionado(servico)}
              >
                {servicoSelecionado.nome === servico.nome && (
                  <div className="selected-icon">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}

                <div className="service-left">
                  <input
                    type="checkbox"
                    checked={servicoSelecionado.nome === servico.nome}
                    readOnly
                  />

                  <div>
                    <h3>{servico.nome}</h3>
                    <span>{servico.descricao}</span>
                  </div>
                </div>

                <div className="service-right">
                  <h2>{servico.preco}</h2>
                  <span>{servico.duracao}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cliente-card-footer">
            <div>
              <span>Total estimado</span>
              <h2>{total}</h2>
            </div>

            <button
              className="dark-button"
              onClick={() => scrollPara('card-horario', 2)}
            >
              Continuar
              <ArrowRight size={17} />
            </button>
          </div>
        </section>

        <section className="cliente-card" id="card-horario">
          <div className="cliente-card-header between">
            <div>
              <h1>Data e Horário</h1>
              <p>Escolha quando você deseja ser atendido.</p>
            </div>

            <button
              className="back-button"
              onClick={() => scrollPara('card-servico', 1)}
            >
              <ArrowLeft size={15} />
              Voltar
            </button>
          </div>

          <div className="schedule-grid">
            <div className="calendar-box">
              <h3>Escolha o dia</h3>

              <div className="calendar-content custom-calendar-wrapper">
                <DayPicker
                  mode="single"
                  selected={diaSelecionado?.toLocaleDateString('pt-BR')}
                  onSelect={setDiaSelecionado}
                  month={month}
                  onMonthChange={setMonth}
                  showOutsideDays
                  className="custom-calendar"
                />
              </div>
            </div>

            <div className="hours-box">
              <h3>Horários disponíveis</h3>

              <div className="hours-content">
                <span>
                  {diaSelecionado?.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>

                <div className="hours-grid">
                  {horarios.map((horario) => (
                    <button
                      key={horario}
                      className={
                        horarioSelecionado === horario
                          ? 'selected-hour'
                          : ''
                      }
                      onClick={() => setHorarioSelecionado(horario)}
                    >
                      {horario}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="cliente-card-footer">
            <div>
              <span>Selecionado</span>
              <h2>
                {diaSelecionado?.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                })} às {horarioSelecionado}
              </h2>
            </div>

            <button
              className="dark-button"
              onClick={() => scrollPara('card-confirmacao', 3)}
            >
              Revisar
              <ArrowRight size={17} />
            </button>
          </div>
        </section>

        <section className="cliente-card" id="card-confirmacao">
          <div className="cliente-card-header between">
            <div>
              <h1>Confirme seu Agendamento</h1>
              <p>Revise os detalhes antes de finalizar.</p>
            </div>

            <button
              className="back-button"
              onClick={() => scrollPara('card-horario', 2)}
            >
              <ArrowLeft size={15} />
              Voltar
            </button>
          </div>

          <div className="summary-box">
            <h3>Resumo do Pedido</h3>

            <div className="summary-item">
              <div className="summary-content">
                <Calendar size={17} />

                <div className='summary-text'>
                  <span>Data e Hora</span>
                  <strong>
                    {diaSelecionado?.toLocaleDateString('pt-BR')} Nov às {horarioSelecionado}
                  </strong>
                </div>
              </div>

              <button
                className="edit-button"
                onClick={() => scrollPara('card-horario', 2)}
              >
                Editar
              </button>
            </div>

            <div className="summary-item">
              <div className="summary-content">
                <Scissors size={17} />

                <div className='summary-text'>
                  <span>Serviço</span>
                  <strong>{servicoSelecionado.nome}</strong>
                </div>
              </div>

              <button
                className="edit-button"
                onClick={() => scrollPara('card-servico', 1)}
              >
                Editar
              </button>
            </div>

            <div className="summary-item">
              <div className="summary-content">
                <User size={17} />

                <div className='summary-text'>
                  <span>Profissional</span>
                  <strong>Qualquer barbeiro</strong>
                </div>
              </div>

              <button
                className="edit-button"
                onClick={() => scrollPara('card-servico', 1)}
              >
                Editar
              </button>
            </div>

            <div className="summary-total">
              <span>Total a pagar no local</span>
              <h2>{total}</h2>
            </div>
          </div>

          <div className="customer-data-section">
            <h3>Seus Dados</h3>

            <div className="form-grid">
              <div className="input-box">
                <label>Nome Completo</label>
                <input type="text" placeholder="Digite seu nome" />
              </div>

              <div className="input-box">
                <label>Telefone</label>
                <input type="text" placeholder="(00) 00000-0000" />
              </div>
            </div>

            <div className="input-box full-width">
              <label>E-mail</label>
              <input type="email" placeholder="seuemail@gmail.com" />
            </div>

            <div className="confirmation-footer">
              <p className="policy-text">
                Ao confirmar o agendamento você concorda com os termos da barbearia.
              </p>

              <button className="confirm-button">
                <Check size={18} />
                Confirmar Agendamento
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default AgendamentoCliente;