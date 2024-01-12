import React, { useState, useEffect } from 'react';
import styles from './ActivityLogPage.module.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ActivityLogPage() {
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({
        tipo: '',
        data: new Date(),
        calorias: '',
        quilometragem: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedActivities = localStorage.getItem('activities');
        if (storedActivities) {
            const parsedActivities = JSON.parse(storedActivities).map(activity => ({
                ...activity,
                data: new Date(activity.data) // Converte a string ISO de volta para um objeto Date
            }));
            setActivities(parsedActivities);
        }
    }, []);

    const handleAddActivity = () => {
        if (!newActivity.tipo || !newActivity.data || !newActivity.calorias || !newActivity.quilometragem) {
            setErrorMessage('Por favor, preencha todos os campos antes de adicionar uma atividade.');
            return;
        }

        const updatedActivities = [...activities, { ...newActivity, data: newActivity.data.toISOString() }];
        setActivities(updatedActivities);
        localStorage.setItem('activities', JSON.stringify(updatedActivities));
        setNewActivity({ tipo: '', data: new Date(), calorias: '', quilometragem: '' }); // Reset form com a nova data
        setErrorMessage('');
    };

    const handleDeleteActivity = (index) => {
        const updatedActivities = activities.filter((_, i) => i !== index);
        setActivities(updatedActivities);
        localStorage.setItem('activities', JSON.stringify(updatedActivities));
    };

    const handleDateChange = (date) => {
        setNewActivity({ ...newActivity, data: date }); // armazena o objeto Date diretamente
    };

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
                <ReactDatePicker
                    selected={newActivity.data}
                    onChange={handleDateChange}
                    className={styles.input}
                    placeholderText="Data"
                    dateFormat="dd/MM/yyyy" // Adiciona o formato da data
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
                            <p>{activity.tipo} - {new Date(activity.data).toLocaleDateString('pt-BR')} - {activity.calorias} calorias - {activity.quilometragem} km</p>
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
