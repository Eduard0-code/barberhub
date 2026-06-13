import { User, Menu, ChevronDown } from 'lucide-react';
import './Header.css';
import { Link } from 'react-router-dom';
import { usuarioLogado } from '../services/api.js';

const Header = () => {
  const usuario = usuarioLogado();
  const nome = usuario?.cliNome || usuario?.barNome || 'Visitante';
  const tipo = usuario?.barNome ? 'Barbeiro' : usuario?.cliNome ? 'Cliente' : 'Convidado';

  return (
    <header className="header-container">
      <div className="menu-logo">
        <div className="logo-icon">✂</div>
        <div className="logo-text">Barber Hub</div>
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
        <Menu size={24} className="mobile-menu" />
      </div>
    </header>
  );
};

export default Header;
