import React from "react";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <header style={{ marginBottom: "20px" }}>
        <h1>FormEasy</h1>
        <nav>
          <Link to="/" style={{ marginRight: "10px"}}>Início</Link>
          <Link to="/create" style={{ marginRight: "10px"}}>Criar Formulário</Link>
          <Link to="/dashboard">Painel</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

    </div>
  );
}

export default App;