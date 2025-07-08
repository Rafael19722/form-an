import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function AdminPanel() {
    const [formularios, setFormularios] = useState([]);

    useEffect(() => {
        const carregarFormulario = async () => {
            const colRef = collection(db, "formularios");
            const snapshot = await getDocs(colRef);

            const lista = await Promise.all(snapshot.docs.map(async (docSnap) => {
                const dados = docSnap.data();

                let totalRespostas = 0;

                try {
                    const respostasSnap = await getDocs(collection(db, `formularios/${docSnap.id}/respostas`));
                    totalRespostas = respostasSnap.size;
                } catch (error) {
                    console.error("Erro ao buscar respostas:", error);
                }

                return {
                    id: docSnap.id,
                    titulo: dados.titulo,
                    perguntas: dados.perguntas,
                    totalRespostas,
                };
            }));

            setFormularios(lista);
        };

        carregarFormulario();
    }, []);

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
                            <span>{form.totalRespostas} resposta(s)</span>
                            <br />
                            <Link to={`/form/${form.id}`}>Ver formulário</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AdminPanel;