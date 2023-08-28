import React, { ChangeEvent, useRef, KeyboardEvent } from 'react'
import './style.css';
import { usePathStore, useRoomStore } from '../../stores';

//              component : 방 접속 화면 컴포넌트             //
export default function Enter() {
  
//              state             //
// description: Enter Button Ref 상태 //
const enterButtonRef = useRef<HTMLDivElement | null>(null);

  // description : path 상태 변경 //
  const { setPath } = usePathStore();
  // description : room 상태 및 변경 함수 //
  const { room, setRoom } = useRoomStore();
  
//              event handler             //
  // description : room 값 변경 처리 //
  const onRoomValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const room = event.target.value;
    setRoom(room);
  }

  // description : 뒤로 버튼 클릭 처리 //
  const onBackButtonClickHandler = () => {
    setRoom('');
    setPath('/');
  }

  // description : 들어가기 버튼 클릭 처리 //
  const onEnterButtonClickHandler = () => {
    if(!room) return;
    setPath('/room');
  }

  // description : Enter Key 처리 //
  const onEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(!enterButtonRef.current) return;
    enterButtonRef.current.click();
  }

  
//              render : 방 접속 화면 컴포넌트 랜더링             //
  return (
    <div id='enter-wrapper'>
      <div className='enter-back-button' onClick={onBackButtonClickHandler} >뒤로</div>
      <div className='enter-input-box'>
        <input className='enter-input' type='text' placeholder='방 이름을 입력해주세요.' value={room} onChange={onRoomValueChangeHandler} onKeyDown={onEnterKeyDownHandler} />
        <div ref={enterButtonRef} className='enter-button' onClick={onEnterButtonClickHandler} >들어가기</div>
      </div>
    </div>
  )
}
