import BarberCadLog from './components/Cadastro-Login-Barber.jsx'
import AgendamentoBarbeiro from './components/AgendamentoBarbeiro.jsx'
import AgendamentoCliente from './components/AgendamentoCliente.jsx'
import VisualizacaoBarbeiro from "./components/VisualizacaoBarbeiro.jsx";
import GestaoFinanceira from "./components/GestaoFinanceira.jsx";
import AvaliacaoCliente from "./components/AvaliacaoCliente.jsx";
import AvaliacaoBarbeiro from "./components/AvaliacaoBarbeiro.jsx";
import Home from './components/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<BarberCadLog />} />
      <Route path="/agendamento-barbeiro" element={<AgendamentoBarbeiro />} />

      <Route path="/agendamento-cliente" element={<AgendamentoCliente />} />

      <Route path="/visualizacao-barbeiro" element={<VisualizacaoBarbeiro />} />
      <Route path="/gestao-financeira" element={<GestaoFinanceira />} />
      <Route path="/avaliacao-cliente" element={<AvaliacaoCliente />} />
      <Route path="/avaliacao-barbeiro" element={<AvaliacaoBarbeiro />} />
    </Routes>
  );
}

export default App;
