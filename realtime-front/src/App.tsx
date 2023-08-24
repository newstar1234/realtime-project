import React, { useEffect, useState } from 'react';
import './App.css';

import{ io } from 'socket.io-client';

function App() {

  const [connectedSocket, setConnectedSocket] = useState<any>(false);
  const [message, setMessage] = useState<string>('');

  const onEmitButtonHandler = () => {
    connectedSocket.emit('send', message);
  }

  useEffect(() => {
    if(!connectedSocket) {
      const socket = io('http://localhost:4010')
      setConnectedSocket(socket);
    }
    else {
      connectedSocket.on('receive', (message:string) => {
        console.log(message);
      });
    }
  }, [])

  return (
    <div>
      <input onChange={(event) => setMessage(event.target.value)} />
      <button onClick={onEmitButtonHandler}>전송</button>
    </div>
  );
}

export default App;
