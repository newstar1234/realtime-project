import { create } from "zustand";
import { v4 as uuid } from 'uuid';

interface User {
    id: string;
    nickname: string;
    setNickname: (nickname:string) => void;
}
// 초기값 설정해줘야함
const useUserStore = create<User>(set => ({
    id: uuid(),
    nickname: '',

    setNickname: (nickname:string) => set(state => ({...state, nickname})),     
}));

export default useUserStore;