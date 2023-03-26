package com.example.websocketdemo.model;


import java.util.LinkedHashMap;

public class ChatMessage {
    private MessageType type;
    private LinkedHashMap<String,Integer> userPoint;// key-> username , value -> point
    private String description;

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public LinkedHashMap<String, Integer> getUserPoint() {
        return userPoint;
    }

    public void setUserPoint(LinkedHashMap<String, Integer> userPoint) {
        this.userPoint = userPoint;
    }

    public void addUserPoint(String user, Integer point) {
        if(userPoint==null){
            userPoint=new LinkedHashMap<>();
        }
        userPoint.put(user,point);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
