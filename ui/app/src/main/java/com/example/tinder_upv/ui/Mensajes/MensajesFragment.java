package com.example.tinder_upv.ui.Mensajes;

import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tinder_upv.LogicaNegocio;
import com.example.tinder_upv.MainActivity;
import com.example.tinder_upv.R;
import com.example.tinder_upv.Utilidades;

import java.util.ArrayList;

public class MensajesFragment extends Fragment {
        private ArrayList<ChatList> lista;
        private ChatListAdapter chatListAdapter;
        private RecyclerView recyclerView;

        private ListView listView;
        private Handler handler;
        private Runnable runnable;
        private long timestamp_ultimo_ChatList;

        @Nullable
        @Override
        public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
            return inflater.inflate(R.layout.fragment_mensajes, container, false);

        }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        lista = new ArrayList<>();
        recyclerView = view.findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        chatListAdapter = new ChatListAdapter(lista);
        recyclerView.setAdapter(chatListAdapter);
        // Aquí podrías obtener los chats de una base de datos o de una API.
        // Para simplificar, aquí simplemente creamos algunos chats de prueba.
        //Lista.add(new ChatList(1, "User1", "Hello", 1000));
        //Lista.add(new ChatList(1, "User2", "Hi", 1000001));
        //Lista.add(new ChatList(1, "User3", "pp", 10000045));

        // etc.
        handler = new Handler();
        runnable = new Runnable() {
            @Override
            public void run() {
                LogicaNegocio.encontrarDatosUltimosMensajes(MainActivity.id_usuario, timestamp_ultimo_ChatList,  (resultados) -> {
                    if(resultados.isEmpty()){

                    }else {
                        lista.clear();
                        lista.addAll(resultados);
                        chatListAdapter.notifyDataSetChanged();
                    }
                    timestamp_ultimo_ChatList =Utilidades.getTimeStampUltimoChatList(lista, timestamp_ultimo_ChatList);
                    Log.d("MensajesFragment", "timestamp_ultimo_ChatList="+timestamp_ultimo_ChatList);
                });
                handler.postDelayed(this, 300); // Ejecutar cada 0.5 segundos
            }
        };


    }
    @Override
    public void onResume() {
        super.onResume();

        // Inicia la ejecución periódica del Runnable
        handler.postDelayed(runnable, 0);
    }
    @Override
    public void onPause() {
        super.onPause();

        // Detén la ejecución periódica del Runnable
        handler.removeCallbacks(runnable);
    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        // Eliminar los datos o realizar acciones de limpieza aquí
    }

    }

