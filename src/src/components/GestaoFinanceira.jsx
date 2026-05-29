// pages/GestaoFinanceira.jsx

import "./GestaoFinanceira.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MenuLateral from "../components/MenuLateral.jsx";
import { useState } from "react";

import {
  Wallet,
  Users,
  Receipt,
  Plus,
  Check,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import GraficoFinanceiro from "../components/GraficoFinanceiro";

const GestaoFinanceira = () => {
  const [periodo, setPeriodo] = useState("semana");
  const atendimentos = [
    {
      horario: "14:30",
      cliente: "João Silva",
      servico: "Corte + Barba",
      valor: "R$ 65,00",
      status: "Concluído",
    },
    {
      horario: "13:00",
      cliente: "Marcos Pereira",
      servico: "Corte de Cabelo",
      valor: "R$ 40,00",
      status: "Concluído",
    },
    {
      horario: "11:45",
      cliente: "Cliente Avulso",
      servico: "Barba",
      valor: "R$ 30,00",
      status: "Concluído",
    },
    {
      horario: "10:30",
      cliente: "Carlos Eduardo",
      servico: "Corte + Pigmentação",
      valor: "R$ 80,00",
      status: "Concluído",
    },
    {
      horario: "15:30",
      cliente: "Felipe Santos",
      servico: "Corte de Cabelo",
      valor: "R$ 40,00",
      status: "Agendado",
    },
  ];

  return (
    <>
      <Header />
      <div className="financeiro-container">
        <MenuLateral />

        <div className="financeiro-content">
          {/* CARDS */}
          <div className="financeiro-cards">
            <div className="financeiro-card">
              <div className="card-icon">
                <Wallet size={18} />
              </div>

              <span>Total Recebido (Hoje)</span>

              <h2>R$ 450,00</h2>

              <p>+12% em relação a ontem</p>
            </div>

            <div className="financeiro-card">
              <div className="card-icon">
                <Users size={18} />
              </div>

              <span>Atendimentos (Hoje)</span>

              <h2>12</h2>

              <p>3 agendados para tarde</p>
            </div>

            <div className="financeiro-card">
              <div className="card-icon">
                <Receipt size={18} />
              </div>

              <span>Ticket Médio</span>

              <h2>R$ 37,50</h2>

              <p>Calculado com base em 30 dias</p>
            </div>
          </div>

          {/* GRID */}
          <div className="financeiro-grid">
            <div className="pagamentos-card">
              <div className="pagamentos-header">
                <h3>Atualizar Pagamentos</h3>

                <Plus size={18} />
              </div>

              <div className="pagamentos-body">
                <button className="btn-update">
                  <Check size={18} />
                  Atualizar
                </button>

                <button className="btn-cancel">Cancelar</button>
              </div>
            </div>

            <div className="table-card">
              <div className="table-header">
                <h3>Atendimentos Recentes</h3>

                <div className="table-actions">
                  <button>
                    <Filter size={15} />
                    Filtrar
                  </button>

                  <button>
                    <Download size={15} />
                    Exportar
                  </button>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>HORÁRIO</th>
                    <th>CLIENTE</th>
                    <th>SERVIÇO</th>
                    <th>VALOR</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {atendimentos.map((item) => (
                    <tr key={item.horario}>
                      <td>{item.horario}</td>

                      <td className="cliente-name">{item.cliente}</td>

                      <td>{item.servico}</td>

                      <td className="valor-cell">{item.valor}</td>

                      <td>
                        <span
                          className={`status ${
                            item.status === "Concluído" ? "done" : "scheduled"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="table-footer">
                <span>Mostrando 5 de 12 registros</span>

                <div className="pagination">
                  <button>
                    <ChevronLeft size={16} />
                  </button>

                  <button className="active-page">1</button>

                  <button>2</button>

                  <button>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* GRÁFICO */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>
                Evolução de Receita (
                {periodo === "semana" ? "Semanal" : "Mensal"})
              </h3>

              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
              >
                <option value="semana">Esta Semana</option>

                <option value="mes">Último Mês</option>
              </select>
            </div>

            <div className="chart-wrapper">
              <GraficoFinanceiro />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GestaoFinanceira;
