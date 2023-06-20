package com.example.tinder_upv.chat;

//{["id_mensaje":3,"id_sender":1,"id_receiver":2,"mensaje":"holi","hora_envio":123456}]


public class ChatMessage {
    private int id_mensaje;
    private String id_sender;

    private String id_receiver;
    private String content;
    private long time;

    public ChatMessage(int id_mensaje, String id_sender, String id_receiver, String content, long time) {
        this.id_mensaje = id_mensaje;
        this.id_sender = id_sender;
        this.id_receiver = id_receiver;
        this.content = content;
        this.time = time;
    }

    public int getId_mensaje() {
        return id_mensaje;
    }

    public String getId_sender() {
        return id_sender;
    }


    public String getId_receiver(){return this.id_receiver;}

    public String getContenido() {
        return content;
    }

    public long getHora_envio() {
        return time;
    }

}