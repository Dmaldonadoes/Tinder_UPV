package com.example.tinder_upv.ui.Mensajes;

public class ChatList {
    private final int id_otro;
    private  String username;
    private  String lastMessage;
    private  long timestamp;

    public ChatList(int id_otro, String username, String lastMessage, long timestamp) {
        this.username = username;
        this.lastMessage = lastMessage;
        this.timestamp = timestamp;
        this.id_otro = id_otro;
    }

    public String getUsername() {
        return username;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public long getTimestamp() {
        return timestamp;
    }
    public int getId_otro(){
        return id_otro;
    }
}
