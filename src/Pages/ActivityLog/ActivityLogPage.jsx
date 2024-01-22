import React, { useState, useEffect } from 'react';
import styles from '../ActivityLog/ActivityLogPage.module.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { pt } from 'date-fns/locale';
import { db } from '../../firebase-config';
import { collection, getDocs, addDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { getAnalytics, logEvent } from "firebase/analytics"; // Importando o Firebase Analytics

function ActivityLogPage() {
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({
        tipo: '',
        data: new Date(),
        calorias: '',
        quilometragem: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const analytics = getAnalytics(); // Inicializando o Firebase Analytics

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await getDocs(collection(db, 'activities'));
            const activitiesData = response.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                data: doc.data().data.toDate() // Converte de Timestamp para objeto Date
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

        const newActivityData = {
            ...newActivity,
            data: Timestamp.fromDate(newActivity.data) // Data como objeto Timestamp
        };

        const docRef = await addDoc(collection(db, 'activities'), newActivityData);
        setActivities([...activities, { ...newActivityData, id: docRef.id, data: newActivity.data }]); // Adiciona a nova atividade ao estado

        logEvent(analytics, 'add_activity'); // Registra um evento de adição de atividade

        setErrorMessage('');
        setNewActivity({ tipo: '', data: new Date(), calorias: '', quilometragem: '' }); // Reset form
    };

    const handleDeleteActivity = async (id) => {
        await deleteDoc(doc(db, 'activities', id));
        setActivities(activities.filter(activity => activity.id !== id));

        logEvent(analytics, 'delete_activity'); // Registra um evento de exclusão de atividade
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
                            <p>{activity.tipo} - {activity.data.toLocaleDateString('pt-BR')} - {activity.calorias} calorias - {activity.quilometragem} km</p>
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