import { Navigate } from "react-router-dom";

// Tela substituida: a configuracao de horarios foi unificada na aba "Agenda" de Ajustes.
const AgendamentoBarbeiro = () => {
  return <Navigate to="/ajustes" replace />;
};

export default AgendamentoBarbeiro;
