package com.example.websocketdemo.controller;

import com.example.websocketdemo.model.ChatMessage;
import com.example.websocketdemo.model.ExceptionMessage;
import com.example.websocketdemo.model.MessageType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;


@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;
    // plaining to add userList with key session, which will pass to client after connection
    // static Map<String,>
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) throws Exception {
        logger.info("Received a new web socket connection");

//        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//        String sessionId = getValueFromHeader(headerAccessor, "session");
//        String username = getValueFromHeader(headerAccessor, "username");
// //      String username = (String) headerAccessor.getSessionAttributes().get("username");
//        if(ChatController.messageHistory.containsKey(sessionId) && ChatController.messageHistory.get(sessionId).getUserPoint().containsKey(username)) {
//            // currently broadcast to all connected users.
//            // throw new Exception("Duplicate Username!!");
//            ExceptionMessage exceptionMessage = new ExceptionMessage();
//            exceptionMessage.setType(MessageType.EXCEPTION);
//            exceptionMessage.setMessage("Duplicate Username::"+username);
//            messagingTemplate.convertAndSend("/topic/public/"+sessionId, exceptionMessage);
//        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = (String) headerAccessor.getSessionAttributes().get("session");

        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if(username != null) {
            logger.info("User Disconnected : " + username);
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setType(MessageType.LEAVE);
            LinkedHashMap map = chatMessage.getUserPoint();
            map.remove(username);
            chatMessage.setUserPoint(map);
            messagingTemplate.convertAndSend("/topic/public", chatMessage);
        }
    }

    private String getValueFromHeader(StompHeaderAccessor accessor, String key) {
        GenericMessage<?> generic = (GenericMessage<?>) accessor.getHeader(SimpMessageHeaderAccessor.CONNECT_MESSAGE_HEADER);
        if (nonNull(generic)) {
            SimpMessageHeaderAccessor nativeAccessor = SimpMessageHeaderAccessor.wrap(generic);
            List<String> userIdValue = nativeAccessor.getNativeHeader(key);

            return isNull(userIdValue) ? null : userIdValue.stream().findFirst().orElse(null);
        }

        return null;
    }
}
