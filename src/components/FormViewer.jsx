import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import {useParams} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function FormViewer() {
    const { id } = useParams();
    const [formulario, setFormulario] = useState(null);
    const [respostas, setRespostas] = useState([]);
    const { usuario } = useAuth();
    const [nomeRespondente, setNomeRespondente] = useState("");

    useEffect(() => {
        const carregarFormulario = async () => {
            const ref = doc(db, "formularios", id);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setFormulario(snap.data());
            } else {
                alert("Formulário não encontrado");
            }
        };
        carregarFormulario();
    }, [id]);

    const enviarRespostas = async (e) => {
        e.preventDefault();

        const ref = collection(db, `formularios/${id}/respostas`);
        try {
            await addDoc(ref, {
                respostas: Object.values(respostas),
                enviadoEm: serverTimestamp(),
                nomeRespondente: usuario?.displayName || nomeRespondente,
                respondenteID: usuario?.uid || null,
            });
            alert("Respostas enviadas com sucesso!");
        } catch (err) {
            console.error("Erro ao enviar resposta:", err);
            alert("Erro ao enviar resposta.");
        }
    };

    if (!formulario) return <p>Carregando...</p>;

    return (
        <div>
            <h2>{formulario.titulo}</h2>
            <form onSubmit={enviarRespostas}>
                {!usuario && (
                    <div>
                        <label>
                            Seu nome:
                            <input 
                                type="text" 
                                value={nomeRespondente}
                                onChange={(e) => setNomeRespondente(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                )}
                {formulario.perguntas.map((pergunta, index) => (
                    <div key={index}>
                        <label>{pergunta}</label>
                        <br />
                        <input
                            type="text"
                            value={respostas[index] || ""}
                            onChange={(e) => setRespostas({...respostas, [index]: e.target.value})}
                            required
                        />
                        <br />
                    </div>
                ))}
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default FormViewer;