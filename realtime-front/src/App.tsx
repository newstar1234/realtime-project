import React, { useEffect, useState } from 'react';
import './App.css';

import{ io } from 'socket.io-client';
import { socket } from './utills/socket';
import { log } from 'console';

function App() {

  
  const [message, setMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const onEmitButtonHandler = () => {
    socket.emit('send', message);
  }

  useEffect(() => {
    const onConnected = () => {
      console.log(socket.id);
      setIsConnected(true);
    }
    const onDisconnect = () => {
      setIsConnected(false);
    }

    socket.on('connect', onConnected);
    socket.on('receive', message => console.log(message));
  }, [])

  return (
    <div>
      <input onChange={(event) => setMessage(event.target.value)} />
      <button onClick={onEmitButtonHandler}>전송</button>
    </div>
  );
}

export default App;
