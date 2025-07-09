import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function FormBuilder() {
    const [titulo, setTitulo] = useState("");
    const [perguntas, setPerguntas] = useState([""]);
    const navigate = useNavigate();
    const { usuario } = useAuth();

    const adicionarPergunta = () => {
        setPerguntas([...perguntas, ""]);
    };

    const atualizarPergunta = (index, valor) => {
        const novas = [...perguntas];
        novas[index] = valor;
        setPerguntas(novas);
    };

    const salvarFormulario = async () => {
        if (!titulo || perguntas.some((p) => !p)) {
            alert("Preencha o título e todas as perguntas!");
            return;
        }

        if (!usuario) return;

        const docRef = await addDoc(collection(db, "formularios"), {
            titulo,
            perguntas,
            criadoPor: usuario.uid,
            nomeCriador: usuario.displayName,
            criadoEm: serverTimestamp(),
        });

        navigate(`/form/${docRef.id}`);
    };

    return (
        <div>
            <h2>Criar Formulário</h2>
                <input 
                    placeholder="Título do formulário"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <h4>Perguntas:</h4>
                {perguntas.map((pergunta, index) => (
                    <input
                        key={index}
                        placeholder={`Pergunta ${index + 1}`}
                        value={pergunta}
                        onChange={(e) => atualizarPergunta(index, e.target.value)}    
                    />
                ))}
                <button onClick={adicionarPergunta}>+ Adicionar pergunta</button>
                <br />
                <button onClick={salvarFormulario}>Salvar e Gerar Link</button>
        </div>
    );

}

export default FormBuilder;

