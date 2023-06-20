package com.example.tinder_upv.ui.Mensajes;

import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tinder_upv.R;
import com.example.tinder_upv.Utilidades;
import com.example.tinder_upv.chat.ChatActivity;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

public class ChatListAdapter extends RecyclerView.Adapter<ChatListAdapter.ChatListViewHolder> {
    private List<ChatList> chatListMessages;
    private AdapterView.OnItemClickListener listener;
    public interface OnItemClickListener {
        void onItemClick(int id_otro);
    }


    public ChatListAdapter(List<ChatList> chatMessages) {
        this.chatListMessages = chatMessages;
    }

    @NonNull
    @Override
    public ChatListViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.chatlist_item, parent, false);
        return new ChatListViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ChatListViewHolder holder, int position) {
        ChatList lista = chatListMessages.get(position);
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(v.getContext(), ChatActivity.class);
                intent.putExtra("id_usuarioChatear", lista.getId_otro());
                intent.putExtra("usernameChatear", lista.getUsername());
                v.getContext().startActivity(intent);
            }
        });
        holder.timestamp.setText(Utilidades.convertirTimestampAHoraEspañola(lista.getTimestamp()));
        holder.username.setText(lista.getUsername());
        holder.lastMessage.setText(lista.getLastMessage());
    }

    @Override
    public int getItemCount() {
        return chatListMessages.size();
    }

    private String formatTime(long timeInMillis) {
        SimpleDateFormat format = new SimpleDateFormat("HH:mm", Locale.getDefault());
        return format.format(timeInMillis);
    }

    static class ChatListViewHolder extends RecyclerView.ViewHolder {
        TextView username;
        TextView lastMessage;
        TextView timestamp;

        ChatListViewHolder(@NonNull View itemView) {
            super(itemView);
            username = itemView.findViewById(R.id.username);
            lastMessage = itemView.findViewById(R.id.lastMessage);
            timestamp = itemView.findViewById(R.id.timestamp);
        }
    }
}

