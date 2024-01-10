import React, { useState } from 'react';
import HomePage from './HomePage';
import ActivityLogPage from './ActivityLogPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <button onClick={() => navigateTo('home')}>Calculadora</button>
      <button onClick={() => navigateTo('activityLog')}>Registro de Atividades</button>

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'activityLog' && <ActivityLogPage />}
    </div>
  );
}

export default App;

