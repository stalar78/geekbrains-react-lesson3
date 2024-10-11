import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messageList, setMessageList] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessageList([...messageList, { author: 'User', text: message }]);
      setMessage('');  // Очищаем поле ввода
    }
  };

  useEffect(() => {
    if (messageList.length > 0 && messageList[messageList.length - 1].author === 'User') {
      const timeout = setTimeout(() => {
        setMessageList([...messageList, { author: 'Robot', text: 'Hello, I am a robot!' }]);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [messageList]);

  return (
    <div className="text-container">
      <p className={`text ${isVisible ? 'visible' : 'hidden'}`}>
        Привет, это сообщение передано через пропс!
      </p>
      <button className="neon-button" onClick={handleClick}>
        {isVisible ? 'Скрыть текст' : 'Показать текст'}
      </button>

      {/* Форма для ввода сообщения */}
      <div className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-message"   // Здесь добавляем стили
          placeholder="Введите сообщение"
        />
        <button className="neon-button" onClick={handleSendMessage}>
          Отправить
        </button>
      </div>

      {/* Рендер списка сообщений */}
      <div className="message-list">
        {messageList.map((msg, index) => (
          <p key={index} className="message">
            <strong>{msg.author}:</strong> {msg.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
