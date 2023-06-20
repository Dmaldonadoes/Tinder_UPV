package com.example.tinder_upv.chat;

import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tinder_upv.MainActivity;
import com.example.tinder_upv.R;
import com.example.tinder_upv.Utilidades;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

public class ChatAdapter extends RecyclerView.Adapter<ChatAdapter.ChatViewHolder> {
    private List<ChatMessage> chatMessages;
    private LinearLayout chatMessageContainer;

    public ChatAdapter(List<ChatMessage> chatMessages) {
        this.chatMessages = chatMessages;
    }

    @NonNull
    @Override
    public ChatViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_chat_message, parent, false);
        return new ChatViewHolder(view);
    }


    @Override
    public void onBindViewHolder(@NonNull ChatViewHolder holder, int position) {
        ChatMessage message = chatMessages.get(position);

        // Si el mensaje actual es igual al anterior, retorna y no configura la vista del mensaje
            // Mostrar los datos del mensaje en las vistas
            holder.textViewTime.setText(Utilidades.convertirTimestampAHoraEspañola(message.getHora_envio()));
            holder.textViewMessage.setText(message.getContenido());
            //Log.d("ChatAdapter", "hora mensaje:" + message.getHora_envio());
            // Modificar la orientación de los mensajes en función de quién los envió
            if (Integer.parseInt(message.getId_sender()) == MainActivity.id_usuario) {
                holder.chatMessageContainer.setGravity(Gravity.END); // Alinea a la derecha
            } else {
                holder.chatMessageContainer.setGravity(Gravity.START); // Alinea a la izquierda
            }


    }


    @Override
    public int getItemCount() {
        return chatMessages.size();
    }

    private String formatTime(long timeInMillis) {
        SimpleDateFormat format = new SimpleDateFormat("HH:mm", Locale.getDefault());
        return format.format(timeInMillis);
    }

    static class ChatViewHolder extends RecyclerView.ViewHolder {
        TextView textViewTime;
        TextView textViewName;
        TextView textViewMessage;
        LinearLayout chatMessageContainer;


        ChatViewHolder(@NonNull View itemView) {
            super(itemView);
            textViewTime = itemView.findViewById(R.id.textViewTime);
            textViewMessage = itemView.findViewById(R.id.textViewMessage);
            chatMessageContainer = itemView.findViewById(R.id.chatMessageContainer); // Agrega esta línea


        }
    }
}

