import React, { useState, useEffect } from 'react';
import styles from './ActivityLogPage.module.css';

function ActivityLogPage() {
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({
        tipo: '',
        data: '',
        calorias: '',
        quilometragem: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedActivities = localStorage.getItem('activities');
        if (storedActivities) {
            setActivities(JSON.parse(storedActivities));
        }
    }, []);

    const handleAddActivity = () => {
        if (!newActivity.tipo || !newActivity.data || !newActivity.calorias || !newActivity.quilometragem) {
            setErrorMessage('Por favor, preencha todos os campos antes de adicionar uma atividade.');
            return;
        }

        const updatedActivities = [...activities, newActivity];
        setActivities(updatedActivities);
        localStorage.setItem('activities', JSON.stringify(updatedActivities));
        setNewActivity({ tipo: '', data: '', calorias: '', quilometragem: '' });
        setErrorMessage('');
    };

    const handleDeleteActivity = (index) => {
        const updatedActivities = activities.filter((_, i) => i !== index);
        setActivities(updatedActivities);
        localStorage.setItem('activities', JSON.stringify(updatedActivities));
    };

    // Função para formatar a data
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Registro de Atividades</h2>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>} {/* Exibe a mensagem de erro */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                    className={styles.input}
                    type="text"
                    value={newActivity.tipo}
                    onChange={e => setNewActivity({ ...newActivity, tipo: e.target.value })}
                    placeholder="Tipo de Atividade"
                />
                <input
                    className={styles.input}
                    type="date"
                    value={newActivity.data}
                    onChange={e => setNewActivity({ ...newActivity, data: e.target.value })}
                    placeholder="Data"
                />
                <input
                    className={styles.input}
                    type="number"
                    value={newActivity.calorias}
                    onChange={e => setNewActivity({ ...newActivity, calorias: e.target.value })}
                    placeholder="Calorias Gastas"
                />
                <input className={`${styles.input} ${styles.lastInput}`}
                    type="number"
                    value={newActivity.quilometragem}
                    onChange={e => setNewActivity({ ...newActivity, quilometragem: e.target.value })}
                    placeholder="Quilometragem Percorrida"
                />
                <button className={`${styles.buttonAdd} ${styles.button}`} onClick={handleAddActivity}>Adicionar Atividade</button>
            </div>

            <ul>
                {activities.map((activity, index) => (
                    <li key={index} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div className={styles.activityMessage}>
                            <p>{activity.tipo} - {formatDate(activity.data)} - {activity.calorias} calorias - {activity.quilometragem} km</p>
                        </div>
                        <div className={styles.buttonDelete}>
                            <button className={`${styles.button} ${styles.buttonDelete}`} onClick={() => handleDeleteActivity(index)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActivityLogPage;
