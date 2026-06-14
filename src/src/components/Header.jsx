import { User, Menu, ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import './Header.css';
import { Link } from 'react-router-dom';
import { usuarioLogado } from '../services/api.js';
import { useSidebar } from '../contexts/SidebarContext.jsx';

const Header = () => {
  const usuario = usuarioLogado();
  const nome = usuario?.cliNome || usuario?.barNome || 'Visitante';
  const tipo = usuario?.barNome ? 'Barbeiro' : usuario?.cliNome ? 'Cliente' : 'Convidado';
  const { colapsado, alternarColapsado, alternarAbertoMobile } = useSidebar();

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

        <button
          className="botao-colapsar"
          onClick={alternarColapsado}
          aria-label="Recolher menu"
        >
          {colapsado ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>

        <div className="menu-logo">
          <div className="logo-icon">✂</div>
          <div className="logo-text">Barber Hub</div>
        </div>
      </div>

      <div className="header-profile">
        <div className="profile-details">
          <span className="profile-name">{nome}</span>
          <span className="profile-badge">{tipo}</span>
        </div>
        <div className="avatar-circle">
          <Link to='/login'>
            <User size={20} />
          </Link>
        </div>
        <ChevronDown size={16} className="dropdown-arrow" />
      </div>
    </header>
  );
};

export default Header;
