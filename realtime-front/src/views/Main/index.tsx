import React, { ChangeEvent } from 'react'
import './style.css';
import { usePathStore, useUserStore } from '../../stores';

//              component : Main 화면 컴포넌트              //
export default function Main() {
  
//              state              //
  // description : 닉네임 상태 및 닉네임 상태 변경 함수 //
  const { nickname, setNickname } = useUserStore();
  // description : Path 상태 변경 함수 //
  const { setPath } = usePathStore();

//              event handler             //
  // description : 닉네임 입력 이벤트 처리 함수 //
  const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const nickname = event.target.value;
    setNickname(nickname);
  }
  // description : 확인 버튼 클릭 이벤트 처리 함수 //
  const onSubmitClickHandler = () => {
    if(!nickname) {
      alert('닉네임을 입력해주세요.');
      return; 
      }
    setPath('/enter');
  }


//              render : Main 화면 컴포넌트 랜더링              //
  return (
    <div id='main-wraaper'>
      <div className='main-container'>
        <div className='main-title-box'>
          <div className='main-title'>접속</div>
        </div>
        <div className='main-input-box'>
          <input className='main-input' type='text' value={nickname} onChange={onNicknameChangeHandler} placeholder='닉네임을 입력해주세요.' />
        </div>
        <div className='main-submit-box'>
          <div className='main-submit-button' onClick={onSubmitClickHandler}>확인</div>
        </div>
      </div>
    </div>
  )
}
