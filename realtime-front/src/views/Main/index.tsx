import React from 'react'
import './style.css';


export default function Main() {
  return (
    <div id='main-wraaper'>
      <div className='main-container'>
        <div className='main-title-box'>
          <div className='main-title'>접속</div>
        </div>
        <div className='main-input-box'>
          <input className='main-input' type='text' placeholder='닉네임을 입력해주세요.' />
        </div>
        <div className='main-submit-box'>
          <div className='main-submit-button'>확인</div>
        </div>
      </div>
    </div>
  )
}
