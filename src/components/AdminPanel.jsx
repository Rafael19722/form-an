import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function AdminPanel() {
    const [formularios, setFormularios] = useState([]);
    const { usuario } = useAuth();

    useEffect(() => {
        if (!usuario) return;

        const carregarFormulario = async () => {
            const colRef = collection(db, "formularios");
            const snapshot = await getDocs(colRef);

            const lista = await Promise.all(snapshot.docs.map(async (docSnap) => {
                const dados = docSnap.data();

                if (dados.criadoPor !== usuario.uid) return null;

                let respostas = [];

                try {
                    const respostasSnap = await getDocs(collection(db, `formularios/${docSnap.id}/respostas`));
                    respostas = respostasSnap.docs.map((resp) => resp.data());
                } catch (error) {
                    console.error("Erro ao buscar respostas:", error);
                }

                return {
                    id: docSnap.id,
                    titulo: dados.titulo,
                    perguntas: dados.perguntas,
                    respostas,
                };
            }));

            setFormularios(lista.filter(Boolean));
        };

        carregarFormulario();
    }, [usuario]);

    return (
        <div>
            <h2>Painel de Formulários</h2>
            {formularios.length === 0 ? (
                <p>Nenhum formulário criado ainda.</p>
            ): (
                <ul>
                    {formularios.map((form) => (
                        <li key={form.id} style={{ marginBottom: "20px" }}>
                            <strong>{form.titulo}</strong>
                            <br />
                            <span>{form.perguntas.length} pergunta(s)</span>
                            <br />
                            <span>{form.respostas.length} resposta(s)</span>
                            <br />
                            <Link to={`/form/${form.id}`}>Ver formulário</Link>

                            {form.respostas.length > 0 && (
                                <div>
                                    <h4>Respostas:</h4>
                                    <ul>
                                        {form.respostas.map((resp, i) => (
                                            <li key={i} style={{ marginBottom: "10px" }}>
                                                <strong>{resp.nomeRespondente || "Anônimo"}:</strong>
                                                <ul>
                                                    {resp.respostas.map((r, j) => (
                                                        <li key={j}>
                                                            <em>{j + 1}º) {form.perguntas[j]}:</em> {r}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AdminPanel;