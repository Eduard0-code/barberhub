import {  User, Menu, ChevronDown } from 'lucide-react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header-container">
     

      <div className="menu-logo">
          <div className="logo-icon">✂</div>
          <div className="logo-text">
            Barber Hub
          </div>
        </div>

      

      <div className="header-profile">
        <div className="profile-details">
          <span className="profile-name">João Silva</span>
          <span className="profile-badge">Admin</span>
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
