import React, { useState } from 'react';
import HomePage from './HomePage';
import ActivityLogPage from './ActivityLogPage';
import homeStyles from './HomePage.module.css'; // Importando as classes CSS da HomePage
import activityLogStyles from './ActivityLogPage.module.css'; // Importando as classes CSS da ActivityLogPage

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={homeStyles.container}> {/* Adicionando a classe do container principal da HomePage */}
      <br />
      <br />
      <div>
        <button className={activityLogStyles.button} onClick={() => navigateTo('home')}>Calculadora</button>
        <button className={activityLogStyles.button} onClick={() => navigateTo('activityLog')}>Registro de Atividades</button>
      </div>

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'activityLog' && <ActivityLogPage />}
    </div>
  );
}

export default App;