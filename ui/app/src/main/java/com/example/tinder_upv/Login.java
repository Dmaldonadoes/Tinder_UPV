package com.example.tinder_upv;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class Login extends AppCompatActivity {

    private EditText mUsernameEditText;
    private EditText mPasswordEditText;
    private TextView contrasenaIncorrecta;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mUsernameEditText = findViewById(R.id.editTextTextEmailAddress);
        mPasswordEditText = findViewById(R.id.editTextTextPassword);
        contrasenaIncorrecta = findViewById(R.id.textView);
        Button loginButton = findViewById(R.id.button);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String username = mUsernameEditText.getText().toString().trim();
                String password = mPasswordEditText.getText().toString().trim();
                //String url = "http://192.168.85.81:8080/comprobarContrasena?username=" + username + "&password=" + password;
                boton_login();
            }

        });
    }
    private void boton_login(){
        Log.d("login", "boton_login: empieza");
        String username = mUsernameEditText.getText().toString().trim();
        String password = mPasswordEditText.getText().toString().trim();
        //"http://192.168.85.81:8080/comprobarContrasena?username="
        LogicaNegocio.comprobarUsuarioYContrasena(username, password, (resultados) -> {

            Log.d("login", "resultados: " + resultados);
            if(resultados>0){
                contrasenaIncorrecta.setText("El usuario o la contraseña es correcta");
                Intent intent = new Intent(this, MainActivity.class);
                intent.putExtra("ID", resultados);
                startActivity(intent);


            }else{
                contrasenaIncorrecta.setText("El usuario o la contraseña es incorrecta");
            }

        });
        Log.d("login", "boton_login: acaba");


    }
    @Override
    public void onBackPressed() {
        // Do nothing
    }
}
