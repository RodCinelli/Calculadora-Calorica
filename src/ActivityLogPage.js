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

    useEffect(() => {
        const storedActivities = localStorage.getItem('activities');
        if (storedActivities) {
            setActivities(JSON.parse(storedActivities));
        }
    }, []);

    const handleAddActivity = () => {
        const updatedActivities = [...activities, newActivity];
        setActivities(updatedActivities);
        localStorage.setItem('activities', JSON.stringify(updatedActivities));
        setNewActivity({ tipo: '', data: '', calorias: '', quilometragem: '' }); // Reset form
    };

    const handleDeleteActivity = (index) => {
        const updatedActivities = activities.filter((_, i) => i !== index);
        setActivities(updatedActivities);
        localStorage.setItem('activities', JSON.stringify(updatedActivities));
    };

    return (
        <div className={styles.container}>
        <h2 className={styles.header}>Registro de Atividades</h2>
            <input
                type="text"
                value={newActivity.tipo}
                onChange={e => setNewActivity({ ...newActivity, tipo: e.target.value })}
                placeholder="Tipo de Atividade"
            />
            <input
                type="date"
                value={newActivity.data}
                onChange={e => setNewActivity({ ...newActivity, data: e.target.value })}
                placeholder="Data"
            />
            <input
                type="number"
                value={newActivity.calorias}
                onChange={e => setNewActivity({ ...newActivity, calorias: e.target.value })}
                placeholder="Calorias Gastas"
            />
            <input
                type="number"
                value={newActivity.quilometragem}
                onChange={e => setNewActivity({ ...newActivity, quilometragem: e.target.value })}
                placeholder="Quilometragem Percorrida"
            />
            <button onClick={handleAddActivity}>Adicionar Atividade</button>

            <ul>
                {activities.map((activity, index) => (
                    <li key={index}>
                        {activity.tipo} - {activity.data} - {activity.calorias} calorias - {activity.quilometragem} km
                        <button onClick={() => handleDeleteActivity(index)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActivityLogPage;
