// pages/VisualizacaoBarbeiro.jsx

import { useMemo, useState } from "react";
import "./VisualizacaoBarbeiro.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuLateral from "./MenuLateral";

import { CalendarDays, RefreshCcw, ArrowLeft, Info } from "lucide-react";

const VisualizacaoBarbeiro = () => {
  const [dataSelecionada, setDataSelecionada] = useState("2026-04-15");

  const agendamentos = [
    {
      horario: "09:00",
      cliente: "Carlos Mendes",
      servico: "Corte de Cabelo",
    },
    {
      horario: "09:30",
      cliente: "Pedro Santos",
      servico: "Barba",
    },
    {
      horario: "10:00",
      cliente: "Rafael Lima",
      servico: "Corte + Barba",
    },
    {
      horario: "10:30",
      cliente: "Lucas Oliveira",
      servico: "Corte de Cabelo",
    },
    {
      horario: "11:00",
      cliente: "André Costa",
      servico: "Barba",
    },
    {
      horario: "14:00",
      cliente: "Marcos Silva",
      servico: "Corte + Barba",
    },
    {
      horario: "14:30",
      cliente: "Felipe Rocha",
      servico: "Corte de Cabelo",
    },
    {
      horario: "15:00",
      cliente: "Bruno Alves",
      servico: "Barba",
    },
  ];

  const dataFormatada = useMemo(() => {
    return new Date(dataSelecionada).toLocaleDateString("pt-BR");
  }, [dataSelecionada]);
  const navigate = useNavigate();

  const atualizarAgenda = () => {
    console.log("Atualizando agenda...");
  };

  return (
    <>
      <Header />
      <div className="visualizacao-page">
        <MenuLateral />
        <main className="visualizacao-main">
          <div className="top-menu">
            <button
              className="menu-link"
              onClick={() => navigate("/agendamento-barbeiro")}
            >
              <Info size={14} />
              Definir Horários de Atendimento
            </button>

            <button className="menu-link active-link">
              <CalendarDays size={14} />
              Visualizar Agenda do Dia
            </button>
          </div>

          <section className="agenda-header">
            <h1>Agenda do Dia</h1>

            <p>
              Consulte os agendamentos programados para uma data específica.
            </p>
          </section>

          <section className="date-card">
            <label>Selecionar Data</label>

            <div className="date-actions">
              <div className="date-input-wrapper">
                <input
                  type="date"
                  value={dataSelecionada}
                  onChange={(e) => setDataSelecionada(e.target.value)}
                />

                <CalendarDays size={17} />
              </div>

              <button className="update-button" onClick={atualizarAgenda}>
                <RefreshCcw size={15} />
                Atualizar
              </button>
            </div>
          </section>

          <section className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>Cliente</th>
                  <th>Serviço</th>
                </tr>
              </thead>

              <tbody>
                {agendamentos.map((agendamento) => (
                  <tr key={`${agendamento.horario}-${agendamento.cliente}`}>
                    <td>{agendamento.horario}</td>

                    <td>
                      <div className="cliente-cell">
                        <div className="cliente-avatar">
                          {agendamento.cliente.charAt(0)}
                        </div>

                        <span>{agendamento.cliente}</span>
                      </div>
                    </td>

                    <td>{agendamento.servico}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="bottom-info">
            <div className="left-info">
              <Info size={15} />

              <span>
                Total de agendamentos:
                <strong> {agendamentos.length}</strong>
              </span>
            </div>

            <span className="selected-date">
              Data selecionada: {dataFormatada}
            </span>
          </section>

          <button
            className="back-button"
            onClick={() => navigate("/agendamento-barbeiro")}
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default VisualizacaoBarbeiro;
