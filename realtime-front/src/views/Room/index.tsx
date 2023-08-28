import React, { useEffect, useState } from 'react'
import './style.css';
import { usePathStore, useRoomStore } from '../../stores';
import { socket } from '../../utills/socket';

//              component : 채팅방 컴포넌트             //
export default function Room() {
  
//              state             //
  // description : path 상태 변경 함수 //
  const { setPath } = usePathStore();
  // description : room 상태 및 변경 함수 //
  const { room, setRoom } = useRoomStore();
  // description : 소켓 연결 상태 //
  const [isSocketConnected, setSocketConnected] = useState<boolean>(socket.connected);
  
//              event handler              //
  // description : 뒤로 버튼 클릭 처리 //
  const onBackButtonClickHandler = () => {
    setPath('/enter');
  }

//              effect              //
  
// description : 첫 마운트 시 소켓 연결 //
let effectFlag = true;
  useEffect(() => {
    if (!effectFlag) return;
    effectFlag = false;

    const onConnect = () => {
      console.log(socket.id);
      setSocketConnected(true);
    }

    const onDisconnect = () => {
      setSocketConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.emit('join', room);
  }, []);
  
//              render : 채팅방 컴포넌트 랜더링             //
  return (
    <div id='room'>
      <div className='room-header'>
        <div className='room-number'>{room}</div>
        <div className='room-back-button' onClick={onBackButtonClickHandler} >뒤로</div>
      </div>
      <div className='room-container'>

      </div>
      <div className='room-footer'>
        <input className='room-send-input' type='text' /> 
        <div className='room-send-button'>보내기</div>
      </div>
    </div>
  )
}
