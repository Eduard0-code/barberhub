import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.jsx';
import "./App.css";

// Lazy load routes para melhorar bundle principal
const BarberCadLog = lazy(() => import('./components/Cadastro-Login-Barber.jsx'));
const Home = lazy(() => import('./components/Home.jsx'));
const AgendamentoBarbeiro = lazy(() => import('./components/AgendamentoBarbeiro.jsx'));
const AgendamentoCliente = lazy(() => import('./components/AgendamentoCliente.jsx'));
const VisualizacaoBarbeiro = lazy(() => import('./components/VisualizacaoBarbeiro.jsx'));
const GestaoFinanceira = lazy(() => import('./components/GestaoFinanceira.jsx'));
const AvaliacaoCliente = lazy(() => import('./components/AvaliacaoCliente.jsx'));
const AvaliacaoBarbeiro = lazy(() => import('./components/AvaliacaoBarbeiro.jsx'));
const Indicadores = lazy(() => import('./components/Indicadores.jsx'));
const Ajustes = lazy(() => import('./components/Ajustes.jsx'));
const Estoque = lazy(() => import('./components/Estoque.jsx'));

const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#666',
  }}>
    Carregando...
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={<BarberCadLog />} />

        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/agendamento-barbeiro" element={<PrivateRoute><AgendamentoBarbeiro /></PrivateRoute>} />
        <Route path="/agendamento-cliente" element={<PrivateRoute><AgendamentoCliente /></PrivateRoute>} />
        <Route path="/visualizacao-barbeiro" element={<PrivateRoute><VisualizacaoBarbeiro /></PrivateRoute>} />
        <Route path="/gestao-financeira" element={<PrivateRoute><GestaoFinanceira /></PrivateRoute>} />
        <Route path="/avaliacao-cliente" element={<PrivateRoute><AvaliacaoCliente /></PrivateRoute>} />
        <Route path="/avaliacao-barbeiro" element={<PrivateRoute><AvaliacaoBarbeiro /></PrivateRoute>} />
        <Route path="/indicadores" element={<PrivateRoute><Indicadores /></PrivateRoute>} />
        <Route path="/estoque" element={<PrivateRoute><Estoque /></PrivateRoute>} />
        <Route path="/ajustes" element={<PrivateRoute><Ajustes /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
