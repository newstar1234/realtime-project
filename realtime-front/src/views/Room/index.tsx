import React, { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from 'react'
import './style.css';
import { usePathStore, useRoomStore, useUserStore } from '../../stores';
import { socket } from '../../utills/socket';
import { MessageDto } from '../../types';
import moment from 'moment';

//              component : 채팅방 컴포넌트             //
export default function Room() {
  
//              state             //

// description : Send Button Ref 상태 //
const sendButtonRef = useRef<HTMLDivElement | null>(null);
// description : Send Button Ref 상태 //
const roomContainerRef = useRef<HTMLDivElement | null>(null);

  // description : path 상태 변경 함수 //
  const { setPath } = usePathStore();
  // description : room 상태 및 변경 함수 //
  const { room, setRoom } = useRoomStore();
  // description : 사용자 정보 상태 //
  const { id, nickname } = useUserStore();
 
  // description : 소켓 연결 상태 //
  const [isSocketConnected, setSocketConnected] = useState<boolean>(socket.connected);
  // description : 메세지 상태 //
  const [message, setMessage] = useState<string>('');
  // description : 메세지 리스트 상태 //
  const [messageList, setMessageList] = useState<MessageDto[]>([]);
  
//              event handler              //
  // description : 메세지 값 변경 처리 //
  const onMessageChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value;
    setMessage(message);
  }

  // description : Enter Key 누름 처리 //
  const onEnterKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(!sendButtonRef.current) return;
    sendButtonRef.current.click();
  }

  // description : 뒤로 버튼 클릭 처리 //
  const onBackButtonClickHandler = () => {
    setPath('/enter');
  }

  // description : 전송 버튼 클릭 처리 //
  const onSendButtonClickHandler = () => {
    if(!message.trim()) return;
    const datetime = moment().format('YYYY-MM-DD hh:mm:ss a');
    const data: MessageDto = { id, room, nickname, message, datetime };
    
    socket.emit('send', data);
    setMessage('');
  }

  // description : Socket Receive 이벤트 처리 //
  const onReceiveHandler = (messageObject : MessageDto) => {
    const newMessageList = [...messageList];
    newMessageList.push(messageObject);
    setMessageList(newMessageList);
  }
  socket.on('receive', onReceiveHandler);
  
//              component : 채팅 메세지 아이템 컴포넌트             //
interface ChatMessageItemProps {
  messageItem : MessageDto;
}
const ChatMessageItem = ({ messageItem } : ChatMessageItemProps) => {
  const { nickname, message, datetime } = messageItem;
  
  if(id === messageItem.id) 
    return(
    <div className='message-box-mine'>
      <div className='message-mine'>{ message }</div>
      <div className='message-datetime'>{ datetime }</div>
    </div>
    );
    
    return(
    <div className='message-box-others'>
      <div className='message-box-wrapper'>
        <div className='message-nickname'>{ nickname }</div>
        <div className='message-container-others'>
          <div className='message-other'>{ message }</div>
          <div className='message-datetime'>{ datetime }</div>
        </div>
      </div>
    </div>
    );
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
    
  // description : 스크롤 자동 이동 //
    useEffect(() => {
      if(!roomContainerRef.current) return;
      roomContainerRef.current.scrollTop = roomContainerRef.current.scrollHeight;
    }, [messageList]);


//              render : 채팅방 컴포넌트 랜더링             //
  return (
    <div id='room'>
      <div className='room-header'>
        <div className='room-number'>{room}</div>
        <div className='room-back-button' onClick={onBackButtonClickHandler} >뒤로</div>
      </div>
      <div ref={roomContainerRef} className='room-container'>
        { messageList.map(messageItem => <ChatMessageItem messageItem={messageItem} />) }
      </div>
      <div className='room-footer'>
        <input className='room-send-input' type='text' value={message} onChange={onMessageChangeHandler} onKeyDown={onEnterKeyDownHandler} /> 
        <div ref={sendButtonRef} className='room-send-button' onClick={onSendButtonClickHandler} >전송</div>
      </div>
    </div>
  )
}
