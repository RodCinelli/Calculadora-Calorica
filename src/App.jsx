import React, { useState } from 'react';
import HomePage from './Pages/Home/HomePage';
import ActivityLogPage from './Pages/ActivityLog/ActivityLogPage';
import homeStyles from './Pages/Home/HomePage.module.css';
import activityLogStyles from './Pages/ActivityLog/ActivityLogPage.module.css';
import { getAnalytics, logEvent } from "firebase/analytics"; // Importando o Firebase Analytics e logEvent

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const analytics = getAnalytics(); // Inicializando o Firebase Analytics

  return (
    <div className={homeStyles.container}>
      <br />
      <br />
      <div>
        <button className={activityLogStyles.button} onClick={() => { navigateTo('home'); logEvent(analytics, 'navigate_home'); }}>Calculadora</button>
        <button className={activityLogStyles.button} onClick={() => { navigateTo('activityLog'); logEvent(analytics, 'navigate_activityLog'); }}>Registro de Atividades</button>
      </div>

      {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
      {currentPage === 'activityLog' && <ActivityLogPage />}
    </div>
  );
}

export default App;