import "./AgendamentoBarbeiro.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuLateral from "./MenuLateral";
import { Check, X,Info,CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AgendamentoBarbeiro = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="page-container">
      <MenuLateral />
        <main className="main-content">
          <div className="page-tabs">
            <button className="page-tab active-page-tab" >
              <Info size={14} />
              Definir Horários de Atendimento
            </button>

            <button
              className="page-tab"
              onClick={() => navigate("/visualizacao-barbeiro")}
            >
              <CalendarDays size={14} />
              Visualizar Agenda do Dia
            </button>
          </div>
          <section className="schedule-section">
            <div className="title-content">
              <h1>Configurar Horários de Atendimento</h1>
              <p>
                Defina os dias e horários em que você estará disponível para
                atender clientes.
              </p>
            </div>

            <div className="schedule-card">
              <div className="card-section">
                <h2>Seleção de Dias</h2>
                <p>Selecione os dias da semana em que você trabalhará</p>

                <div className="days-grid">
                  <label className="day-box">
                    <input type="checkbox" />
                    Segunda-feira
                  </label>

                  <label className="day-box checked">
                    <input type="checkbox" defaultChecked />
                    Terça-feira
                  </label>

                  <label className="day-box checked">
                    <input type="checkbox" defaultChecked />
                    Quarta-feira
                  </label>

                  <label className="day-box checked">
                    <input type="checkbox" defaultChecked />
                    Quinta-feira
                  </label>

                  <label className="day-box checked">
                    <input type="checkbox" defaultChecked />
                    Sexta-feira
                  </label>

                  <label className="day-box checked">
                    <input type="checkbox" defaultChecked />
                    Sábado
                  </label>

                  <label className="day-box">
                    <input type="checkbox" />
                    Domingo
                  </label>
                </div>
              </div>

              <div className="divider" />

              <div className="card-section">
                <h2>Horário de Funcionamento</h2>
                <p>Defina o horário de início e fim do expediente</p>

                <div className="time-grid">
                  <div className="input-group">
                    <label>Horário de Início</label>
                    <input type="time" defaultValue="09:00" />
                  </div>

                  <div className="input-group">
                    <label>Horário de Fim</label>
                    <input type="time" defaultValue="18:00" />
                  </div>
                </div>
              </div>

              <div className="divider" />

              <div className="card-section">
                <h2>Intervalo entre Atendimentos</h2>
                <p>Defina o tempo médio de duração de cada atendimento</p>

                <div className="duration-group">
                  <label>Duração do Atendimento (minutos)</label>

                  <div className="duration-input-wrapper">
                    <input type="number" defaultValue="30" />
                    <span>min</span>
                  </div>

                  <small>Valores sugeridos: 15, 30, 45 ou 60 minutos</small>
                </div>
              </div>
            </div>

            <div className="buttons-container">
              <button className="cancel-button">
                <X size={16} />
                Cancelar
              </button>

              <button className="save-button">
                <Check size={16} />
                Salvar Configurações
              </button>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AgendamentoBarbeiro;
