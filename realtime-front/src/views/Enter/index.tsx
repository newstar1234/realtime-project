import React from 'react'
import './style.css';


export default function Enter() {
  return (
    <div id='enter-wrapper'>
      <div className='enter-back-button'>뒤로</div>
      <div className='enter-input-box'>
        <input className='enter-input' type='text' placeholder='방 이름을 입력해주세요.' />
        <div className='enter-button' >들어가기</div>
      </div>
    </div>
  )
}
