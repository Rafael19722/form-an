import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
  const { usuario, logout, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
      navigate("/create");
    } catch (err) {
      console.error("Erro ao fazer login", err);
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Erro ao fazer logout", err);
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <header style={{ marginBottom: "20px" }}>
        <h1>FormEasy</h1>
        <nav className="cabecalho">
          {usuario && (
            <div className="mostruario">
              <span>Bem-vindo(a), {usuario.displayName}</span>
              <button onClick={handleLogout}>Sair</button>
            </div>
          )}
          {!usuario && (
            <div>
              <button onClick={handleLogin}>Login</button>
            </div>
          )
          }
          <div className="cartel">
            <Link to="/" style={{ marginRight: "10px"}}>Início</Link>
            <Link to="/create" style={{ marginRight: "10px"}}>Criar Formulário</Link>
            <Link to="/dashboard">Painel</Link>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

    </div>
  );
}

export default App;