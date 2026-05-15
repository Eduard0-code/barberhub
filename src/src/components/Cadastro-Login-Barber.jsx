import { useState } from "react";
import "./Cadastro-Login-Barber.css";
import { Scissors,User,Lock,MailIcon,Phone } from "lucide-react";
import { Link} from "react-router-dom";



// ── Header ─────────────────────────────────────────────────────────────────────
const Header = () => (
  <div className="header">
    <div className="brand">
      <Scissors />
      <span className="brand-name">Barber<br/>Hub</span>
    </div>
    <button className="avatar-btn" aria-label="Perfil">
      <User size={28} />
    </button>
  </div>
);

// ── Login Screen ───────────────────────────────────────────────────────────────
const LoginScreen = ({ onCadastro }) => (
  
  <div className="card">
    <Header />
    <div className="card-body">
      <h1 className="page-title">Entrar em Barber Hub</h1>
      <p className="page-subtitle">Preencha os dados abaixo para fazer login.</p>

      <div className="form-group">
        <label className="form-label">E-mail</label>
        <div className="input-wrap">
          <MailIcon  size={14} className="input-icon" />
          <input className="form-input" type="email" placeholder="joao@exemplo.com" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Senha</label>
        <div className="input-wrap">
          <Lock size={14} className="input-icon" />
          <input className="form-input" type="password" placeholder="••••••••" />
        </div>
      </div>
    </div>

    <div className="divider" />

    <div className="card-footer">
    
      <button className="btn btn-outline" onClick={onCadastro}>Cadastro</button>
      <Link to='/'>
       <button className="btn btn-solid" >Login</button>
      </Link>
    </div>
  </div>
);

// ── Register Screen ────────────────────────────────────────────────────────────
const RegisterScreen = ({ onCancelar }) => (
  <div className="card">
    <Header />
    <div className="card-body">
      <h1 className="page-title">Novo Cliente</h1>
      <p className="page-subtitle">Preencha os dados abaixo para cadastrar um novo cliente no sistema.</p>

      <div className="form-group">
        <label className="form-label">Nome</label>
        <div className="input-wrap">
          <User  className="input-icon" />
          <input className="form-input" type="text" placeholder="Ex: João da Silva" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">E-mail</label>
        <div className="input-wrap">
          <MailIcon  className="input-icon" />
          <input className="form-input" type="email" placeholder="joao@exemplo.com" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Telefone</label>
        <div className="input-wrap">
          <Phone className="input-icon" />
          <input className="form-input" type="tel" placeholder="(31) 99999-9999" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Senha</label>
        <div className="input-wrap">
          <Lock className="input-icon" />
          <input className="form-input" type="password" placeholder="••••••••" />
        </div>
        <p className="form-hint">Mínimo de 8 caracteres.</p>
      </div>

      <div className="form-group">
        <label className="form-label">Confirmar Senha</label>
        <div className="input-wrap">
          <Lock className="input-icon" />
          <input className="form-input" type="password" placeholder="••••••••" />
        </div>
      </div>
    </div>

    <div className="divider" />

    <div className="card-footer">
      <button className="btn btn-outline" onClick={onCancelar}>Cancelar</button>
      <button className="btn btn-solid">Cadastrar</button>
    </div>
  </div>
);

// ── App ────────────────────────────────────────────────────────────────────────
export default function BarberCadLog() {
  const [screen, setScreen] = useState("login");
  
  return (
    <>
      <div className="app">
        {screen === "login"
          ? <LoginScreen onCadastro={() => setScreen("register")} />
          : <RegisterScreen onCancelar={() => setScreen("login")} />
        }
      </div>
    </>
  );
}