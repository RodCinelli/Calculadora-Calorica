import React, { useState, useEffect } from 'react';
import styles from './ActivityLogPage.module.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { pt } from 'date-fns/locale';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

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
        const fetchActivities = async () => {
            const response = await getDocs(collection(db, 'activities'));
            const activitiesData = response.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                data: new Date(doc.data().data.split('/').reverse().join('-')) // Converte de Dia/Mês/Ano para objeto Date
            }));
            setActivities(activitiesData);
        };

        fetchActivities();
    }, []);

    const handleAddActivity = async () => {
        if (!newActivity.tipo || !newActivity.data || !newActivity.calorias || !newActivity.quilometragem) {
            setErrorMessage('Por favor, preencha todos os campos antes de adicionar uma atividade.');
            return;
        }

        const formattedDate = newActivity.data.toLocaleDateString('pt-BR');
        const newActivityData = {
            ...newActivity,
            data: formattedDate // Data no formato dia/mês/ano
        };

        const docRef = await addDoc(collection(db, 'activities'), newActivityData);
        setActivities([...activities, { ...newActivityData, id: docRef.id }]); // Adiciona a nova atividade ao estado

        setErrorMessage('');
        setNewActivity({ tipo: '', data: new Date(), calorias: '', quilometragem: '' }); // Reset form
    };


    const handleDeleteActivity = async (id) => {
        await deleteDoc(doc(db, 'activities', id));
        setActivities(activities.filter(activity => activity.id !== id));
    };

    const handleDateChange = (date) => {
        setNewActivity({ ...newActivity, data: date });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Registro de Atividades</h2>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                    className={styles.input}
                    type="text"
                    value={newActivity.tipo}
                    onChange={e => setNewActivity({ ...newActivity, tipo: e.target.value })}
                    placeholder="Tipo de Atividade"
                />
                <div className={styles.datePicker}>
                    <ReactDatePicker
                        selected={newActivity.data}
                        onChange={handleDateChange}
                        className={styles.input}
                        placeholderText="Data"
                        dateFormat="dd/MM/yyyy"
                        locale={pt}
                    />
                </div>
                <input
                    className={styles.input}
                    type="number"
                    value={newActivity.calorias}
                    onChange={e => setNewActivity({ ...newActivity, calorias: e.target.value })}
                    placeholder="Calorias Gastas"
                />
                <input
                    className={`${styles.input} ${styles.lastInput}`}
                    type="number"
                    value={newActivity.quilometragem}
                    onChange={e => setNewActivity({ ...newActivity, quilometragem: e.target.value })}
                    placeholder="Quilômetros Percorridos"
                />
                <button className={`${styles.buttonAdd} ${styles.button}`} onClick={handleAddActivity}>Adicionar Atividade</button>
            </div>

            <ul>
                {activities.map((activity) => (
                    <li key={activity.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div className={styles.activityMessage}>
                            <p>{activity.tipo} - {new Date(activity.data).toLocaleDateString('pt-BR')} - {activity.calorias} calorias - {activity.quilometragem} km</p>
                        </div>
                        <div className={styles.buttonDelete}>
                            <button className={`${styles.button} ${styles.buttonDelete}`} onClick={() => handleDeleteActivity(activity.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActivityLogPage;
