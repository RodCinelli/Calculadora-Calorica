import React, { useState } from 'react';
import HomePage from './HomePage';
import ActivityLogPage from './ActivityLogPage';
import homeStyles from './HomePage.module.css';
import activityLogStyles from './ActivityLogPage.module.css';
import { getAnalytics } from "firebase/analytics"; // Importando o Firebase Analytics

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