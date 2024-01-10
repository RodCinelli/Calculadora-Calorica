import React, { useState } from 'react';
import styles from './HomePage.module.css';

function HomePage() {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [idade, setIdade] = useState('');
    const [pesoDesejado, setPesoDesejado] = useState('');
    const [resultado, setResultado] = useState({ caloriasDiarias: 0, quilometragemNecessaria: 0 });

    const calcularPerdaDePeso = () => {
        const fatorAtividade = 1.55; // Atividade moderada
        const alturaEmCm = altura * 100; // Convertendo altura em metros para centímetros
        const tmb = 447.593 + (9.247 * peso) + (3.098 * alturaEmCm) - (4.330 * idade);
        const caloriasDiarias = tmb * fatorAtividade;
        const deficitTotal = 7700 * (peso - pesoDesejado);
        const quilometragemNecessaria = deficitTotal / 60;

        setResultado({ caloriasDiarias, quilometragemNecessaria });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Calculadora de Perda de Peso</h1>
            <input type="number" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Peso Atual (kg)" />
            <input type="number" value={altura} onChange={e => setAltura(e.target.value)} placeholder="Altura (m)" step="0.01" />
            <input type="number" value={idade} onChange={e => setIdade(e.target.value)} placeholder="Idade" />
            <input type="number" value={pesoDesejado} onChange={e => setPesoDesejado(e.target.value)} placeholder="Peso Desejado (kg)" />
            <button onClick={calcularPerdaDePeso}>Calcular</button>
            <div>
                <p>Calorias diárias para perder peso: {resultado.caloriasDiarias.toFixed(1)} kcal</p>
                <p>Quilometragem necessária para perder peso: {resultado.quilometragemNecessaria.toFixed(1)} km</p>
            </div>
        </div>
    );
}

export default HomePage;
