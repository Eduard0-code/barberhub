
import './MenuLateral.css';
import { useNavigate } from 'react-router-dom';

import {
  House,
  CalendarDays,
  Star,
  Settings,
  Users,
  DollarSign,
  BarChart3,
} from 'lucide-react';

const MenuLateral = () => {
  const navigate = useNavigate();
  return (
    <aside className="menu-lateral">
      <div>
       

        <div className="menu-section">
          <span className="menu-title">Menu</span>

          <nav className="menu-nav">
            <button className="menu-item active-item" onClick={() => navigate("/")}>
              <House size={18} />
              Home
            </button>

            <button className="menu-item" onClick={() => navigate("/agendamento-cliente")}>
              <CalendarDays size={18} />
              Agendar
            </button>
            <button className="menu-item" onClick={() => navigate("/agendamento-barbeiro")}>
              <CalendarDays size={18} />
              Agenda
            </button>
            <button className="menu-item" onClick={() => navigate("/visualizacao-barbeiro")}>
              <Users size={18} />
              Clientes
            </button>

            <button className="menu-item" onClick={() => navigate("/avaliacao-cliente")}>
              <Star size={18} />
              Avaliar
            </button>
            <button className="menu-item" onClick={() => navigate("/avaliacao-barbeiro")}>
              <Star size={18} />
              Avaliações 
            </button>
            <button className="menu-item" onClick={() => navigate("/gestao-financeira")}>
              <DollarSign size={18} />
              Financeiro
            </button>
            <button className="menu-item" onClick={() => navigate("/indicadores")}>
              <BarChart3 size={18} />
              Indicadores
            </button>
            <span className="menu-title">Configurações</span>
            <button className="menu-item" onClick={() => navigate("/ajustes")}>
              <Settings size={18} />
              Ajustes
            </button>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default MenuLateral;