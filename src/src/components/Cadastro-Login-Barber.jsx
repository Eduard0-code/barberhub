import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --bg: #F2EFE9;
    --card: #FAFAF8;
    --ink: #1A1A1A;
    --ink-muted: #7A7672;
    --border: #E0DDD8;
    --accent: #1A1A1A;
    --accent-hover: #333;
    --input-bg: #FFFFFF;
    --input-border: #D6D3CE;
    --input-focus: #1A1A1A;
    --error: #C0392B;
    --radius: 10px;
    --radius-sm: 6px;
  }

  body {
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    background: var(--bg);
    background-image: radial-gradient(circle at 20% 80%, rgba(26,26,26,0.04) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(26,26,26,0.03) 0%, transparent 50%);
  }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    width: 100%;
    max-width: 420px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06);
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* HEADER */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid var(--border);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .brand-icon {
    color: var(--ink);
    width: 28px;
    height: 28px;
  }

  .brand-name {
    font-family: 'DM Serif Display', serif;
    font-size: 17px;
    color: var(--ink);
    line-height: 1.2;
  }

  .avatar-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--border);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }

  .avatar-btn:hover { background: #D6D3CE; }

  /* BODY */
  .card-body {
    padding: 32px 24px 28px;
  }

  .page-title {
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    color: var(--ink);
    margin-bottom: 6px;
    line-height: 1.2;
  }

  .page-subtitle {
    font-size: 13.5px;
    color: var(--ink-muted);
    line-height: 1.5;
    margin-bottom: 28px;
  }

  /* FORM */
  .form-group {
    margin-bottom: 18px;
  }

  .form-label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: var(--ink);
    margin-bottom: 6px;
    letter-spacing: 0.01em;
  }

  .input-wrap {
    position: relative;
  }

  .input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--ink-muted);
    width: 16px;
    height: 16px;
    pointer-events: none;
  }

  .form-input {
    width: 100%;
    padding: 11px 14px 11px 38px;
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--ink);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .form-input::placeholder {
    color: #B8B5B0;
    font-size: 13.5px;
  }

  .form-input:focus {
    border-color: var(--input-focus);
    box-shadow: 0 0 0 3px rgba(26,26,26,0.08);
  }

  .form-hint {
    font-size: 11.5px;
    color: var(--ink-muted);
    margin-top: 5px;
  }

  /* FOOTER */
  .card-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 0 24px 28px;
  }

  .btn {
    padding: 10px 22px;
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s;
    letter-spacing: 0.01em;
  }

  .btn-outline {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--ink);
  }

  .btn-outline:hover {
    background: var(--border);
  }

  .btn-solid {
    background: var(--accent);
    border: 1px solid var(--accent);
    color: #FFFFFF;
  }

  .btn-solid:hover {
    background: var(--accent-hover);
    border-color: var(--accent-hover);
  }

  .divider {
    height: 1px;
    background: var(--border);
    margin: 0 24px 24px;
  }
`;

// ── Icons ──────────────────────────────────────────────────────────────────────
const ScissorsIcon = () => (
  <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
    <line x1="8.12" y1="8.12" x2="12" y2="12"/>
  </svg>
);

const UserIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const MailIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LockIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 10.5 19.79 19.79 0 0 1 1.61 2c-.07-.97.46-1.87 1.38-2H5.5a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 7.91a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

// ── Header ─────────────────────────────────────────────────────────────────────
const Header = () => (
  <div className="header">
    <div className="brand">
      <ScissorsIcon />
      <span className="brand-name">Barber<br/>Hub</span>
    </div>
    <button className="avatar-btn" aria-label="Perfil">
      <UserIcon size={18} />
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
          <MailIcon />
          <input className="form-input" type="email" placeholder="joao@exemplo.com" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Senha</label>
        <div className="input-wrap">
          <LockIcon />
          <input className="form-input" type="password" placeholder="••••••••" />
        </div>
      </div>
    </div>

    <div className="divider" />

    <div className="card-footer">
      <button className="btn btn-outline" onClick={onCadastro}>Cadastro</button>
      <button className="btn btn-solid">Login</button>
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
          <span className="input-icon"><UserIcon size={16} /></span>
          <input className="form-input" type="text" placeholder="Ex: João da Silva" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">E-mail</label>
        <div className="input-wrap">
          <MailIcon />
          <input className="form-input" type="email" placeholder="joao@exemplo.com" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Telefone</label>
        <div className="input-wrap">
          <PhoneIcon />
          <input className="form-input" type="tel" placeholder="(31) 99999-9999" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Senha</label>
        <div className="input-wrap">
          <LockIcon />
          <input className="form-input" type="password" placeholder="••••••••" />
        </div>
        <p className="form-hint">Mínimo de 8 caracteres.</p>
      </div>

      <div className="form-group">
        <label className="form-label">Confirmar Senha</label>
        <div className="input-wrap">
          <LockIcon />
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
      <style>{styles}</style>
      <div className="app">
        {screen === "login"
          ? <LoginScreen onCadastro={() => setScreen("register")} />
          : <RegisterScreen onCancelar={() => setScreen("login")} />
        }
      </div>
    </>
  );
}