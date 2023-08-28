import React from 'react'
import './style.css';
import { usePathStore, useRoomStore } from '../../stores';

//              component             //
export default function Room() {
  
//              state             //
  const { setPath } = usePathStore();
  const { room, setRoom } = useRoomStore();
  
//              render             //
  return (
    <div id='room'>
      <div className='room-header'>
        <div className='room-number'>{room}</div>
        <div className='room-back-button'>뒤로</div>
      </div>
      <div className='room-container'></div>
      <div className='room-footer'></div>
    </div>
  )
}
