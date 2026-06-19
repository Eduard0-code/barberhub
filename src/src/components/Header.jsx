import { LogOut, Menu, ChevronDown, PanelLeftClose, PanelLeftOpen, Scissors } from 'lucide-react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { usuarioLogado, logout } from '../services/api.js';
import { useSidebar } from '../contexts/SidebarContext.jsx';

const Header = () => {
  const usuario = usuarioLogado();
  const nome = usuario?.cliNome || usuario?.barNome || 'Visitante';
  const tipo = usuario?.barNome ? 'Barbeiro' : usuario?.cliNome ? 'Cliente' : 'Convidado';
  const { colapsado, alternarColapsado, alternarAbertoMobile } = useSidebar();
  const navigate = useNavigate();

  const sair = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header-container">
      <div className="header-left">
        <button
          className="botao-mobile-menu"
          onClick={alternarAbertoMobile}
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>

        <div className="menu-logo">
          <span className="logo-icon">
            <Scissors size={26} strokeWidth={2.2} />
          </span>
          <span className="logo-text">Barber Hub</span>
        </div>

        <button
          className="botao-colapsar"
          onClick={alternarColapsado}
          aria-label={colapsado ? 'Expandir menu' : 'Recolher menu'}
          title={colapsado ? 'Expandir menu' : 'Recolher menu'}
        >
          {colapsado ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      <div className="header-profile">
        <div className="profile-details">
          <span className="profile-name">{nome}</span>
          <span className="profile-badge">{tipo}</span>
        </div>
        <button
          className="avatar-circle"
          onClick={sair}
          aria-label="Sair"
          title="Sair"
        >
          <LogOut size={20} />
        </button>
        <ChevronDown size={16} className="dropdown-arrow" />
      </div>
    </header>
  );
};

export default Header;
