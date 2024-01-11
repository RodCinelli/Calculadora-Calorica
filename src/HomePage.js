import React, { useState } from 'react';
import styles from './HomePage.module.css';

function HomePage() {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [idade, setIdade] = useState('');
    const [pesoDesejado, setPesoDesejado] = useState('');
    const [dias, setDias] = useState(''); // Novo estado para o número de dias
    const [resultado, setResultado] = useState({ caloriasDiarias: 0, quilometragemNecessaria: 0 });

    const calcularPerdaDePeso = () => {
        const fatorAtividade = 1.55; // Atividade moderada
        const alturaEmCm = altura * 100; // Convertendo altura em metros para centímetros
        const tmb = 447.593 + (9.247 * peso) + (3.098 * alturaEmCm) - (4.330 * idade);
        const caloriasParaManterPeso = tmb * fatorAtividade;
        const caloriasParaPerderPeso = caloriasParaManterPeso - 500; // Criando um déficit de 500 calorias
        const deficitTotal = 7700 * (peso - pesoDesejado);
        const quilometragemNecessaria = deficitTotal / 60 / dias; // Dividindo pelo número de dias

        setResultado({ caloriasDiarias: caloriasParaPerderPeso, quilometragemNecessaria });
    }

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
                <p>Baseado num déficit calórico diário de 500 kcal</p>
                <p>Calorias diárias para perder peso: {Math.ceil(resultado.caloriasDiarias)} kcal</p>
                <p>Kms necessários para perder peso: {Math.ceil(resultado.quilometragemNecessaria)} km/dia</p>
            </div>
        </div>
    );
}

export default HomePage;