import React from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();

    return (
        <div style={{ textAlign: "center", marginTop: "5rem" }}>
            <h2>Bem-Vindo ao FormEasy</h2>
            <p>Entre com usa conta Google para continuar</p>
            <button onClick={login}>Login com Google</button>
        </div>
    );
}