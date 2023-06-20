package com.example.tinder_upv.chat;

import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.tinder_upv.LogicaNegocio;
import com.example.tinder_upv.MainActivity;
import com.example.tinder_upv.R;
import com.example.tinder_upv.Utilidades;
import com.example.tinder_upv.ui.Mensajes.ChatList;

import java.util.ArrayList;
import java.util.List;

public class ChatActivity extends AppCompatActivity {
    private RecyclerView recyclerView;
    private ChatAdapter chatAdapter;
    private List<ChatMessage> chatMessages;
    private long horaUltimaPeticion = 0;
    EditText textoMensaje;
    Button enviarMensaje;
    private Handler handler;
    private Runnable runnable;
    private int id_elOtroUsuario;
    private int idUltimoMensaje;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ChatMessage pp = new ChatMessage(0, "0", "0", "0",0);
        setTitle(getIntent().getStringExtra("usernameChatear"));
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);
        id_elOtroUsuario=getIntent().getIntExtra("id_usuarioChatear",0);

        // Inicializar el RecyclerView
        recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Inicializar la lista de mensajes
        chatMessages = new ArrayList<>();

        // Crear un adaptador para el RecyclerView
        chatAdapter = new ChatAdapter(chatMessages);
        recyclerView.setAdapter(chatAdapter);
        textoMensaje = findViewById(R.id.et_message);
        enviarMensaje=findViewById(R.id.btn_send);

        // Simular la recepción de mensajes del servidor en formato JSON
        //String json = "[{\"id_mensaje\":1255,\"id_sender\":2,\"id_reciever\":1,\"content\":\"Hola\",\"time\":1000},{\"id_mensaje\":1257,\"id_sender\":2,\"id_reciever\":1,\"content\":\"Soy Pedro\",\"time\":1002},{\"id_mensaje\":1264,\"id_sender\":1,\"id_reciever\":2,\"content\":\"Juegas a fútbol\",\"time\":1009}]";
        /*LogicaNegocio.recibirMensajes(MainActivity.id_usuario, id_elOtroUsuario, (resultados) -> {

            chatMessages.addAll(resultados);
            runOnUiThread(() -> chatAdapter.notifyDataSetChanged());
            //horaUltimaPeticion=System.currentTimeMillis()-500;
            //Log.d("HoraCreación", Long.toString(horaUltimaPeticion));
            idUltimoMensaje= Utilidades.getIdUltimoMensaje(resultados, idUltimoMensaje);
            recyclerView.scrollToPosition(chatAdapter.getItemCount() - 1);
        });*/
        handler = new Handler();
        runnable = new Runnable() {
            @Override
            public void run() {
                    LogicaNegocio.recibirNuevosMensajes(MainActivity.id_usuario, id_elOtroUsuario, idUltimoMensaje, (resultados) -> {
                            //Log.d("resultados", resultados.toString());
                            //Log.d("resultadosAnteriores", resultadosAnteriores.toString());

                            chatMessages.addAll(resultados);
                            runOnUiThread(() -> chatAdapter.notifyDataSetChanged());
                            Log.d("RecibirMensajesNUevos", resultados.toString());
                            if (!resultados.isEmpty()) {
                                recyclerView.scrollToPosition(chatAdapter.getItemCount() - 1);
                            }
                            idUltimoMensaje = Utilidades.getIdUltimoMensaje(resultados, idUltimoMensaje);
                            //resultadosAnteriores = resultados;
                            //horaUltimaPeticion=System.currentTimeMillis()-500;

                    });
                handler.postDelayed(this, 300); // Ejecutar cada 0.5 segundos
            }
        };

        enviarMensaje.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(textoMensaje.equals("")){

                }else{
                    Log.d("EnviarMensaje", "onClick: " + idUltimoMensaje);
                    LogicaNegocio.publicarMensaje(textoMensaje.getText().toString(), MainActivity.id_usuario,id_elOtroUsuario, () -> {
                        /*LogicaNegocio.recibirNuevosMensajes(MainActivity.id_usuario, id_elOtroUsuario, idUltimoMensaje,(resultados) -> {

                            chatMessages.addAll(resultados);
                            runOnUiThread(() -> chatAdapter.notifyDataSetChanged());
                            //horaUltimaPeticion=System.currentTimeMillis();
                            idUltimoMensaje=Utilidades.getIdUltimoMensaje(resultados);
                            recyclerView.scrollToPosition(chatAdapter.getItemCount() - 1);
                        });*/
                    });
                    textoMensaje.setText("");
                }

            }
        });
        // Analizar el JSON y agregar los mensajes a la lista
        ;

        // Notificar al adaptador sobre el cambio de datos
    }
    @Override
    protected void onResume() {
        super.onResume();

        // Inicia la ejecución periódica del Runnable
        handler.postDelayed(runnable, 0);
    }
    @Override
    protected void onPause() {
        super.onPause();

        // Detén la ejecución periódica del Runnable
        handler.removeCallbacks(runnable);
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        // Eliminar los datos o realizar acciones de limpieza aquí
    }


}
