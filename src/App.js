import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const [chats, setChats] = useState([
    { id: 'chat1', name: 'Чат 1' },
    { id: 'chat2', name: 'Чат 2' },
    { id: 'chat3', name: 'Чат 3' },
  ]);

  const [activeChat, setActiveChat] = useState(chats[0].id); // Текущий активный чат
  const [messagesByChat, setMessagesByChat] = useState({
    chat1: [],
    chat2: [],
    chat3: [],
  });

  const [isVisible, setIsVisible] = useState(true);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const handleChatClick = (chatId) => {
    setActiveChat(chatId);
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        author: 'User',
        text: message,
      };

      // Добавляем сообщение к активному чату
      setMessagesByChat({
        ...messagesByChat,
        [activeChat]: [...messagesByChat[activeChat], newMessage],
      });
      setMessage('');
      inputRef.current.focus();
    }
  };

  // Автоответ робота
  useEffect(() => {
    const currentMessages = messagesByChat[activeChat];
    if (
      currentMessages.length > 0 &&
      currentMessages[currentMessages.length - 1].author === 'User'
    ) {
      const timeout = setTimeout(() => {
        const robotMessage = {
          id: Date.now() + 1,
          author: 'Robot',
          text: 'Hello, I am a robot!',
        };

        setMessagesByChat((prevMessagesByChat) => ({
          ...prevMessagesByChat,
          [activeChat]: [...prevMessagesByChat[activeChat], robotMessage],
        }));
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [messagesByChat, activeChat]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        {/* Список чатов */}
        <div className="chat-list">
          <List>
            {chats.map((chat) => (
              <ListItem
                button
                key={chat.id}
                onClick={() => handleChatClick(chat.id)}
              >
                <ListItemText primary={chat.name} />
              </ListItem>
            ))}
          </List>
        </div>

        {/* Контент чата */}
        <div className="chat-content">
          <p className={`text ${isVisible ? 'visible' : 'hidden'}`}>
            Привет, это сообщение передано через пропс!
          </p>
          <Button variant="contained" color="secondary" onClick={handleClick}>
            {isVisible ? 'Скрыть текст' : 'Показать текст'}
          </Button>

          {/* Добавляем изображение в центр */}
          <img
            src="https://avatars.githubusercontent.com/u/108256095?v=4"
            alt="avatar"
            className="centered-image"
          />

          {/* Список сообщений */}
          <div className="message-list">
            {messagesByChat[activeChat]?.map((msg) => (
              <p key={msg.id} className="message">
                <strong>{msg.author}:</strong> {msg.text}
              </p>
            ))}
          </div>

          {/* Форма для ввода сообщения */}
          <div className="message-form">
            <TextField
              inputRef={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите сообщение"
              variant="outlined"
              fullWidth
              InputProps={{
                style: {
                  color: '#00ff99',
                  backgroundColor: 'black',
                  border: '2px solid #00ff99',
                },
              }}
              inputProps={{
                style: {
                  color: '#00ff99',
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              style={{ marginTop: '10px' }}
            >
              Отправить
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
