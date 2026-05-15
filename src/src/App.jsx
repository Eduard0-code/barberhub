import BarberCadLog from './components/Cadastro-Login-Barber.jsx'
import AgendamentoBarbeiro from './components/AgendamentoBarbeiro.jsx'
import AgendamentoCliente from './components/AgendamentoCliente.jsx'
import VisualizacaoBarbeiro from "./components/VisualizacaoBarbeiro.jsx";
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
    </Routes>
  );
}

export default App;
