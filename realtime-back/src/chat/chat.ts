import { Injectable, Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './types';

@WebSocketGateway(4010, { transports: ['websocket', 'polling'], cors: { origin: '*' } })
export class Chat {

  @WebSocketServer()
  server: Server
  logger = new Logger();

// 특정사람한테 메세지 보내기 전에 조인하기  //
  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() room: string,
    @ConnectedSocket() socket: Socket
  ): void {
    this.logger.warn('Join Room ! - ' + JSON.stringify(room));
    socket.join(room);
  }
// 메세지 보내기
  @SubscribeMessage('send')
  handleSend(@MessageBody() data: MessageDto) {
    const { room } = data;
    this.logger.warn('Send Event ! - ' + JSON.stringify(data));
    this.server.to(room).emit('receive', data);
  }







// 메세지 보내기 객체형태로(JSON) //
//   @SubscribeMessage('send')
//   handleSend(@MessageBody() data: any): void {
//     this.logger.verbose(JSON.stringify(data));
//     this.server.emit('receive', data);
//   }
// 특정한 room에만 메세지 보낼수 있음 //
//   @SubscribeMessage('sendRoom')
//   handleSendRoom(@MessageBody() data:any) :void {
//     const { room, message } = data;
//     this.server.to(room).emit('roomReceive', message);
//   }

}
