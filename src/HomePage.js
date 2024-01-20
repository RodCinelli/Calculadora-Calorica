import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { analytics } from './firebase-config'; // Importando o Firebase Analytics
import { logEvent } from "firebase/analytics";

function HomePage() {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [idade, setIdade] = useState('');
    const [pesoDesejado, setPesoDesejado] = useState('');
    const [dias, setDias] = useState('');
    const [resultado, setResultado] = useState({ caloriasDiarias: 0, quilometragemNecessaria: 0 });

    const calcularPerdaDePeso = () => {
        const fatorAtividade = 1.55; // Atividade moderada
        const alturaEmCm = altura * 100; // Convertendo altura em metros para centímetros
        const tmb = 447.593 + (9.247 * peso) + (3.098 * alturaEmCm) - (4.330 * idade);
        const caloriasParaPerderPeso = tmb * fatorAtividade - 500; // Criando um déficit de 500 calorias
        const deficitTotal = 7700 * (peso - pesoDesejado);
        const quilometragemNecessaria = deficitTotal / 60 / dias; // Dividindo pelo número de dias

        setResultado({ caloriasDiarias: caloriasParaPerderPeso, quilometragemNecessaria }); // Atualizando o estado resultado

        logEvent(analytics, 'calculate_weight_loss'); // Registra um evento no Firebase Analytics
    };

    const limparFormulario = () => {
        setPeso('');
        setAltura('');
        setIdade('');
        setPesoDesejado('');
        setDias('');
        setResultado({ caloriasDiarias: 0, quilometragemNecessaria: 0 });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Calculadora de Perda de Peso</h2>
            <input className={styles.input} type="number" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Peso Atual (kg)" />
            <input className={styles.input} type="number" value={altura} onChange={e => setAltura(e.target.value)} placeholder="Altura (m)" step="0.01" />
            <input className={styles.input} type="number" value={idade} onChange={e => setIdade(e.target.value)} placeholder="Idade" />
            <input className={styles.input} type="number" value={pesoDesejado} onChange={e => setPesoDesejado(e.target.value)} placeholder="Peso Desejado (kg)" />
            <input className={`${styles.input} ${styles.lastInput}`} type="number" value={dias} onChange={e => setDias(e.target.value)} placeholder="Dias" />
            <button className={styles.button} onClick={calcularPerdaDePeso}>Calcular</button>
            <button className={styles.button} onClick={limparFormulario}>Limpar</button>
            <div className={styles.resultado}>
                <p>Baseado num déficit de 500 cal por dia</p>
                <p>Calorias diárias para perder peso: {resultado.caloriasDiarias.toFixed(2)}</p>
                <p>Quilometragem para perder peso: {resultado.quilometragemNecessaria.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default HomePage;



