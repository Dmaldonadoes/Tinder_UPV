package com.example.tinder_upv.ui.Encontrar;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.example.tinder_upv.chat.ChatActivity;
import com.example.tinder_upv.LogicaNegocio;
import com.example.tinder_upv.MainActivity;
import com.example.tinder_upv.databinding.FragmentEncontrarBinding;

public class EncontrarFragment extends Fragment {

    private FragmentEncontrarBinding binding;
    private int id_usuarioChatear;
    private String usernameChatear;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = FragmentEncontrarBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        boton_actualizardatos();
        Button siguiente = binding.siguiente;
        Button chatear = binding.chatear;

        siguiente.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                boton_actualizardatos();
            }
        });

        chatear.setOnClickListener((new View.OnClickListener() {
            @Override
            public void onClick(View view) {boton_chatear();}
        }));
        return root;
    }
    private void boton_actualizardatos() {

        ImageView laFoto = binding.imageView2;
        TextView nombreyedad = binding.nombreyedadencontrar;
        TextView descripcion = binding.descripcionencontrar;
        Log.d("prueba", "boton_actualizardatos: empieza");

        LogicaNegocio.recibirDatosAleatorios(MainActivity.id_usuario, (resultados) -> {
            Bitmap previousBitmap = laFoto.getDrawingCache();
            if (previousBitmap != null && !previousBitmap.isRecycled()) {
                previousBitmap.recycle();
            }
            Log.d("prueba", "MainActivity.boton_actualizardatos(): resultados: " + resultados);
            laFoto.setImageBitmap(resultados.getPhoto());
            nombreyedad.setText(resultados.getName() + ", " +resultados.getAge() + " años.");
            descripcion.setText(resultados.getDescription());
            Log.d("prueba", resultados.toString());
            id_usuarioChatear=resultados.getId();
            usernameChatear=resultados.getName();

        });
        Log.d("prueba", "MainActivity.boton_pedir_pulsado(): acaba");
    }
    private void boton_chatear(){
        Intent intent = new Intent(getActivity(), ChatActivity.class);
        intent.putExtra("id_usuarioChatear", id_usuarioChatear);
        intent.putExtra("usernameChatear", usernameChatear);

        startActivity(intent);
    }
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}