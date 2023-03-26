package com.example.websocketdemo.controller;

import com.example.websocketdemo.model.ChatMessage;
import com.example.websocketdemo.model.DescriptionMessage;
import com.example.websocketdemo.model.MessageType;
import com.example.websocketdemo.model.UserJoin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;


@Controller
public class ChatController {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    static Map<String, ChatMessage> messageHistory = new HashMap<>();
    @MessageMapping("/sendDescription/{sessionId}")
    @SendTo("/topic/public/{sessionId}")
    public DescriptionMessage sendMessage(@DestinationVariable String sessionId, @Payload DescriptionMessage descriptionMessage) {
        System.out.println(descriptionMessage.getDescription());
        ChatMessage chatMessage = messageHistory.get(sessionId);
        chatMessage.setDescription(descriptionMessage.getDescription());
        messageHistory.put(sessionId,chatMessage);
        return descriptionMessage;
    }

    @MessageMapping("/addUser/{sessionId}")
//    @SendTo("/topic/public/{sessionId")
    // return type ChatMessage
    public void addUser(@DestinationVariable String sessionId, @Payload UserJoin userJoin,
                               SimpMessageHeaderAccessor headerAccessor) {
//        System.out.println(headerAccessor.getNativeHeader("sender"));
//        System.out.println(chatMessage.getSender().toString());
        headerAccessor.getSessionAttributes().put("username", userJoin.getUsername());
        headerAccessor.getSessionAttributes().put("session", sessionId);
        ChatMessage chatMessage;
        if(messageHistory.containsKey(sessionId)){
            chatMessage = messageHistory.get(sessionId);
        } else {
            chatMessage = new ChatMessage();
        }
        chatMessage.setType(MessageType.JOIN);
        chatMessage.addUserPoint(userJoin.getUsername(), -1);
        messageHistory.put(sessionId,chatMessage);
//         Add username in web socket session

        messagingTemplate.convertAndSend("/topic/public/" + sessionId,chatMessage);
    }

}
