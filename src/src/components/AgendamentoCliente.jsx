import { useEffect, useMemo, useState } from 'react';
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
import {
  servicoApi,
  barbeiroApi,
  agendamentoApi,
  clienteApi,
  usuarioLogado,
} from '../services/api.js';

const servicosFallback = [
  { srvCodigo: 1, srvNome: 'Corte de Cabelo', srvPreco: 45 },
  { srvCodigo: 2, srvNome: 'Barba Completa', srvPreco: 35 },
  { srvCodigo: 3, srvNome: 'Corte + Barba', srvPreco: 70 },
  { srvCodigo: 4, srvNome: 'Sobrancelha', srvPreco: 15 },
];

const horarios = [
  '09:00', '09:30', '10:00', '10:30', '11:00',
  '14:00', '14:30', '15:00', '15:30', '16:00',
];

const formatarMoeda = (valor) =>
  Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

const AgendamentoCliente = () => {
  const [servicos, setServicos] = useState(servicosFallback);
  const [barbeiros, setBarbeiros] = useState([]);
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [servicoSelecionado, setServicoSelecionado] = useState(servicosFallback[0]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState(null);
  const [diaSelecionado, setDiaSelecionado] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [horarioSelecionado, setHorarioSelecionado] = useState('14:00');
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const logado = usuarioLogado();
  const [nome, setNome] = useState(logado?.cliNome || '');
  const [telefone, setTelefone] = useState(logado?.cliTelefone || '');
  const [email, setEmail] = useState(logado?.cliEmail || '');

  useEffect(() => {
    servicoApi.listar()
      .then((dados) => {
        if (dados.length) {
          setServicos(dados);
          setServicoSelecionado(dados[0]);
        }
      })
      .catch(() => {});

    barbeiroApi.listar()
      .then((dados) => {
        const ativos = dados.filter((b) => b.barAtivo !== false);
        setBarbeiros(ativos);
        if (ativos.length) setBarbeiroSelecionado(ativos[0]);
      })
      .catch(() => {});
  }, []);

  const total = useMemo(
    () => formatarMoeda(servicoSelecionado?.srvPreco || 0),
    [servicoSelecionado]
  );

  const scrollPara = (id, etapa) => {
    setEtapaAtual(etapa);
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const confirmarAgendamento = async () => {
    setErro('');
    setMensagem('');

    if (!servicoSelecionado || !diaSelecionado || !horarioSelecionado) {
      setErro('Selecione serviço, dia e horário');
      return;
    }
    if (!nome || !email || !telefone) {
      setErro('Preencha seus dados antes de confirmar');
      return;
    }

    setCarregando(true);
    try {
      let cliCodigo = logado?.cliCodigo;

      if (!cliCodigo) {
        const todos = await clienteApi.listar().catch(() => []);
        const existente = todos.find((c) => c.cliEmail === email);
        if (existente) {
          cliCodigo = existente.cliCodigo;
        } else {
          const novo = await clienteApi.criar({
            cliNome: nome,
            cliEmail: email,
            cliTelefone: telefone,
            cliSenha: '00000000',
          });
          cliCodigo = novo.cliCodigo;
        }
      }

      const dataIso = diaSelecionado.toISOString().slice(0, 10);
      const horaIso = horarioSelecionado + ':00';

      await agendamentoApi.criar({
        cliCodigo,
        barCodigo: barbeiroSelecionado?.barCodigo || null,
        srvCodigo: servicoSelecionado.srvCodigo,
        agdData: dataIso,
        agdHorario: horaIso,
        agdPreco: servicoSelecionado.srvPreco,
        agdStatus: 'Agendado',
      });

      setMensagem('Agendamento realizado com sucesso');
    } catch (e) {
      setErro(e.message || 'Falha ao salvar agendamento');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Header />
      <div className="cliente-page">
        <MenuLateral />
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
                <p>Escolha um serviço para o seu agendamento.</p>
              </div>
            </div>

            <div className="services-container">
              {servicos.map((servico) => (
                <div
                  key={servico.srvCodigo}
                  className={`service-item ${
                    servicoSelecionado?.srvCodigo === servico.srvCodigo
                      ? 'selected-service'
                      : ''
                  }`}
                  onClick={() => setServicoSelecionado(servico)}
                >
                  {servicoSelecionado?.srvCodigo === servico.srvCodigo && (
                    <div className="selected-icon">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}

                  <div className="service-left">
                    <input
                      type="checkbox"
                      checked={servicoSelecionado?.srvCodigo === servico.srvCodigo}
                      readOnly
                    />

                    <div>
                      <h3>{servico.srvNome}</h3>
                      <span>Serviço da barbearia</span>
                    </div>
                  </div>

                  <div className="service-right">
                    <h2>{formatarMoeda(servico.srvPreco)}</h2>
                  </div>
                </div>
              ))}
            </div>

            {barbeiros.length > 0 && (
              <div className="barbeiro-selector">
                <label>Profissional</label>
                <select
                  value={barbeiroSelecionado?.barCodigo || ''}
                  onChange={(e) =>
                    setBarbeiroSelecionado(
                      barbeiros.find((b) => b.barCodigo === Number(e.target.value))
                    )
                  }
                >
                  {barbeiros.map((b) => (
                    <option key={b.barCodigo} value={b.barCodigo}>
                      {b.barNome}
                    </option>
                  ))}
                </select>
              </div>
            )}

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
                    selected={diaSelecionado}
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
                        className={horarioSelecionado === horario ? 'selected-hour' : ''}
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
                      {diaSelecionado?.toLocaleDateString('pt-BR')} às {horarioSelecionado}
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
                    <strong>{servicoSelecionado?.srvNome}</strong>
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
                    <strong>{barbeiroSelecionado?.barNome || 'Qualquer barbeiro'}</strong>
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
                  <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className="input-box">
                  <label>Telefone</label>
                  <input
                    type="text"
                    placeholder="(00) 00000-0000"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-box full-width">
                <label>E-mail</label>
                <input
                  type="email"
                  placeholder="seuemail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {erro && <p className="agendamento-erro">{erro}</p>}
              {mensagem && <p className="agendamento-sucesso">{mensagem}</p>}

              <div className="confirmation-footer">
                <p className="policy-text">
                  Ao confirmar o agendamento você concorda com os termos da barbearia.
                </p>

                <button
                  className="confirm-button"
                  onClick={confirmarAgendamento}
                  disabled={carregando}
                >
                  <Check size={18} />
                  {carregando ? 'Salvando...' : 'Confirmar Agendamento'}
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
