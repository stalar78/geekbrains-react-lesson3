import React from 'react';
import ReactDOM from 'react-dom/client'; // Импортируем createRoot из react-dom
import './index.css';
import App from './App';

// Вместо ReactDOM.render используем createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
