package com.newstar.realtime.controller;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/send") // 클라이언트가 메세지를 보낼 경로
    public void send(@RequestBody String message) {
        String detination = "/topic"; // 메시지를 구독하는 클라이언트에게 전달할 경로
        messagingTemplate.convertAndSend(detination, "message!!!");
    }
    
}
