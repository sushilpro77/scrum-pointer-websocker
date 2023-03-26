package com.example.websocketdemo.model;

public class DescriptionMessage {
    private MessageType type;
    private String description;

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
