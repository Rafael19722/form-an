import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import {useParams} from "react-router-dom";

function FormViewer() {
    const { id } = useParams();
    const [formulario, setFormulario] = useState(null);
    const [respostas, setRespostas] = useState({});

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

    const enviarRespostas = async () => {
        const ref = collection(db, `formularios/${id}/respostas`);
        await addDoc(ref, {
            respostas,
            enviadoEm: serverTimestamp(),
        });
        alert("Respostas enviadas com sucesso!");
    };

    if (!formulario) return <p>Carregando...</p>;

    return (
        <div>
            <h2>{formulario.titulo}</h2>
            {formulario.perguntas.map((pergunta, index) => (
                <div key={index}>
                    <label>{pergunta}</label>
                    <br />
                    <input
                        type="text"
                        value={respostas[index] || ""}
                        onChange={(e) => setRespostas({...respostas, [index]: e.target.value})}
                    />
                    <br />
                </div>
            ))}
            <button onClick={enviarRespostas}>Enviar</button>
        </div>
    );
}

export default FormViewer;