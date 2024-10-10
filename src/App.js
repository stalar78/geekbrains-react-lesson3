import React, { useState } from 'react';
import './App.css';

function App() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="text-container">
      <p className={`text ${isVisible ? 'visible' : 'hidden'}`}>
        Привет, это сообщение передано через пропс!
      </p>
      <button className="neon-button" onClick={handleClick}>
        {isVisible ? 'Скрыть текст' : 'Показать текст'}
      </button>
    </div>
  );
}

export default App;
