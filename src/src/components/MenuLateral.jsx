import './MenuLateral.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext.jsx';

import {
  House,
  CalendarDays,
  Star,
  Settings,
  Users,
  DollarSign,
  BarChart3,
  X,
} from 'lucide-react';

const itens = [
  { rota: '/', icone: House, rotulo: 'Home' },
  { rota: '/agendamento-cliente', icone: CalendarDays, rotulo: 'Agendar' },
  { rota: '/agendamento-barbeiro', icone: CalendarDays, rotulo: 'Agenda' },
  { rota: '/visualizacao-barbeiro', icone: Users, rotulo: 'Clientes' },
  { rota: '/avaliacao-cliente', icone: Star, rotulo: 'Avaliar' },
  { rota: '/avaliacao-barbeiro', icone: Star, rotulo: 'Avaliações' },
  { rota: '/gestao-financeira', icone: DollarSign, rotulo: 'Financeiro' },
  { rota: '/indicadores', icone: BarChart3, rotulo: 'Indicadores' },
];

const itensConfig = [
  { rota: '/ajustes', icone: Settings, rotulo: 'Ajustes' },
];

const MenuLateral = () => {
  const navigate = useNavigate();
  const local = useLocation();
  const { colapsado, abertoMobile, fecharMobile } = useSidebar();

  const irPara = (rota) => {
    fecharMobile();
    navigate(rota);
  };

  const classes = [
    'menu-lateral',
    colapsado ? 'menu-colapsado' : '',
    abertoMobile ? 'menu-aberto-mobile' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      {abertoMobile && <div className="menu-overlay" onClick={fecharMobile} />}

      <aside className={classes}>
        <button
          className="botao-fechar-mobile"
          onClick={fecharMobile}
          aria-label="Fechar menu"
        >
          <X size={20} />
        </button>

        <div className="menu-section">
          <span className="menu-title">Menu</span>

          <nav className="menu-nav">
            {itens.map((item) => {
              const Icone = item.icone;
              const ativo = local.pathname === item.rota;
              return (
                <button
                  key={item.rota}
                  className={`menu-item ${ativo ? 'active-item' : ''}`}
                  onClick={() => irPara(item.rota)}
                  title={item.rotulo}
                >
                  <Icone size={18} />
                  <span className="menu-rotulo">{item.rotulo}</span>
                </button>
              );
            })}
          </nav>

          <span className="menu-title">Configurações</span>

          <nav className="menu-nav">
            {itensConfig.map((item) => {
              const Icone = item.icone;
              const ativo = local.pathname === item.rota;
              return (
                <button
                  key={item.rota}
                  className={`menu-item ${ativo ? 'active-item' : ''}`}
                  onClick={() => irPara(item.rota)}
                  title={item.rotulo}
                >
                  <Icone size={18} />
                  <span className="menu-rotulo">{item.rotulo}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default MenuLateral;
