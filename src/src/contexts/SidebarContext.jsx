import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [colapsado, setColapsado] = useState(() => {
    return localStorage.getItem("sidebar-colapsado") === "true";
  });
  const [abertoMobile, setAbertoMobile] = useState(false);

  useEffect(() => {
    localStorage.setItem("sidebar-colapsado", String(colapsado));
    document.documentElement.style.setProperty(
      "--sidebar-largura",
      colapsado ? "72px" : "245px"
    );
  }, [colapsado]);

  const valor = {
    colapsado,
    setColapsado,
    abertoMobile,
    setAbertoMobile,
    alternarColapsado: () => setColapsado((v) => !v),
    alternarAbertoMobile: () => setAbertoMobile((v) => !v),
    fecharMobile: () => setAbertoMobile(false),
  };

  return <SidebarContext.Provider value={valor}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    return {
      colapsado: false,
      abertoMobile: false,
      alternarColapsado: () => {},
      alternarAbertoMobile: () => {},
      fecharMobile: () => {},
    };
  }
  return ctx;
}
