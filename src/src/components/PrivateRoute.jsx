import { Navigate } from "react-router-dom";
import { usuarioLogado } from "../services/api.js";

// Protege rotas: redireciona para /login quando nao ha usuario autenticado.
const PrivateRoute = ({ children }) => {
  if (!usuarioLogado()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
