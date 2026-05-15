import { Scissors, Mail, HelpCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <div className="logo-mini">
            <Scissors size={14} color="#666" />
          </div>
          <span className="footer-brand">Barber Hub</span>
        </div>
        
        <div className="footer-center">
          <p>© 2026 Barber Hub — Todos os direitos reservados</p>
        </div>
        
        <div className="footer-right">
          <button className="footer-icon-btn" title="Suporte por E-mail">
            <Mail size={18} />
          </button>
          <button className="footer-icon-btn help" title="Central de Ajuda">
            <HelpCircle size={18} />
            <span>Ajuda</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
