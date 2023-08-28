import { create } from "zustand";

interface RoomStore {
    room: string;
    setRoom: (room: string) => void;
}
// 초기값설정해줘야함
const useRoomStore = create<RoomStore>(set => ({
    room: '',
    setRoom: (room:string) => set(state => ({...state, room})),
}));

export default useRoomStore;