package com.example.tinder_upv;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;

import com.example.tinder_upv.chat.ChatMessage;
import com.example.tinder_upv.ui.Mensajes.ChatList;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;


// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
public class LogicaNegocio {

    // ---------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------
    public interface Respuesta {
        void callback(Bundle resultados);
    }

    public interface RespuestaMensajes {
        void callback(List<ChatMessage> resultados);
        //void callback(String cuerpo);
    }

    public interface RespuestaNuevosMensajes {
        void callback(List<ChatList> resultados);
    }

    public interface RespuestaVacia {
        void callback();
    }

    public interface Respuesta_datos {
        void callback(UserData resultados);
    }

    public interface Respuesta_int {
        void callback(int resultados);
    }

    // ---------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------
    private static Optional<String> url_servidor = Optional.empty();
    private static String servidor_por_defecto = "http://192.168.85.81:8080";

    //"http://192.168.85.81:8080";
    // ---------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------
    public static void ponerUrlServidor(String url) {
        Log.d("primeraApp", "LogicaNegocio.ponerUrlServidor(): empieza");
        url_servidor = Optional.of(url);
        Log.d("primeraApp", "LogicaNegocio.ponerUrlServidor(): termina");
    } // ()

    // ---------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------
    public static void recibirDatosAleatorios(int id_usuario, Respuesta_datos responder) {
        Log.d("primeraApp", "LogicaNegocio.recibirDatosAleatorios(): empieza");

        PeticionarioREST elPeticionario = new PeticionarioREST();

        elPeticionario.hacerPeticionREST(
                "GET",
                url_servidor.orElse(servidor_por_defecto) + "/datosaleatorios/" + id_usuario,
                null,
                new PeticionarioREST.RespuestaREST() { /* se puede abreviar: (codigo, cuerpo) -> { .... } */
                    @Override
                    public void callback(int codigo, String cuerpo) throws JSONException {
                        /*Bundle res = new Bundle();
                        res.putInt( "codigo", codigo );
                        res.putString( "resultadoSinParsear", cuerpo );*/

                        Log.d("primeraApp", "LogicaNegocio.pedirAdatosAleatorios().callback: recibo: " + cuerpo);
                        //Parseamos el JSON

                        JsonObject obj = Utilidades.JsonarrayAJsonobject(cuerpo);
                        Bitmap laFotoBitmap = Utilidades.obtenerFotoJSON(obj);
                        int id = obj.get("id").getAsInt();
                        String username = obj.get("username").getAsString();
                        int age = obj.get("age").getAsInt();
                        String description = obj.get("description").getAsString();
                        UserData datosdelusuarioencontrar = new UserData(laFotoBitmap, id, age, username, description);
                        responder.callback(datosdelusuarioencontrar);

                    }


                });


        Log.d("primeraApp", "LogicaNegocio.pedirAlgoAlServidorRest(): termina");

    } // ()

    public static void recibirDatosUsuario(int id_usuario, Respuesta_datos responder) {
        Log.d("primeraApp", "LogicaNegocio.recibirDatosUsuario(): empieza");

        PeticionarioREST elPeticionario = new PeticionarioREST();

        elPeticionario.hacerPeticionREST(
                "GET",
                url_servidor.orElse(servidor_por_defecto) + "/datosUsuario/" + id_usuario,
                null,
                new PeticionarioREST.RespuestaREST() { /* se puede abreviar: (codigo, cuerpo) -> { .... } */
                    @Override
                    public void callback(int codigo, String cuerpo) throws JSONException {
                        /*Bundle res = new Bundle();
                        res.putInt( "codigo", codigo );
                        res.putString( "resultadoSinParsear", cuerpo );*/

                        Log.d("primeraApp", "LogicaNegocio.pedirAdatosAleatorios().callback: recibo: " + cuerpo);
                        //Parseamos el JSON

                        JsonObject obj = Utilidades.JsonarrayAJsonobject(cuerpo);
                        Bitmap laFotoBitmap = Utilidades.obtenerFotoJSON(obj);
                        int id = obj.get("id").getAsInt();
                        String username = obj.get("username").getAsString();
                        int age = obj.get("age").getAsInt();
                        String description = obj.get("description").getAsString();
                        UserData datosdelusuario = new UserData(laFotoBitmap, id, age, username, description);
                        responder.callback(datosdelusuario);

                    }


                });


        Log.d("primeraApp", "LogicaNegocio.pedirAlgoAlServidorRest(): termina");

    } // ()

    public static void recibirMensajes(int id_sender, int id_receiver, RespuestaMensajes responder) {
        Log.d("LogicaNegocio", "recibirMensajes(): empieza");

        PeticionarioREST elPeticionario = new PeticionarioREST();
        //http://172.20.10.2:8080/nuestroChat?id_usuario1=1&id_usuario2=2
        //[{"id_mensaje":1255,"id_sender":2,"id_reciever":1,"content":"Hola","time":1000},{"id_mensaje":1257,"id_sender":2,"id_reciever":1,"content":"Soy Pedro","time":1002},{"id_mensaje":1264,"id_sender":1,"id_reciever":2,"content":"Juegas a fútbol","time":1009}]
        elPeticionario.hacerPeticionREST(
                "GET",
                url_servidor.orElse(servidor_por_defecto) + "/nuestroChat?id_usuario1=" + id_sender + "&id_usuario2=" + id_receiver,
                null,
                new PeticionarioREST.RespuestaREST() { /* se puede abreviar: (codigo, cuerpo) -> { .... } */
                    @Override
                    public void callback(int codigo, String cuerpo) throws JSONException {

                        Log.d("LogicaNegocio", "recibirMensajes(): recibo: " + cuerpo);
                        //Parseamos el JSON
                        //List<ChatMessage> losMensajes;
                        Type messageType = new TypeToken<List<ChatMessage>>() {
                        }.getType();
                        Gson gson = new Gson();
                        List<ChatMessage> messages = gson.fromJson(cuerpo, messageType);
                        responder.callback(messages);

                    }


                });


        Log.d("LogicaNegocio", "recibirMensajes(): termina");

    } // ()

    public static void recibirNuevosMensajes(int id_sender, int id_receiver, int idUltimoMensaje, RespuestaMensajes responder) {
        Log.d("LogicaNegocio", "recibirNuevosMensajes(): empieza");

        PeticionarioREST elPeticionario = new PeticionarioREST();
        //http://172.20.10.2:8080/nuestroChat?id_usuario1=1&id_usuario2=2
        //[{"id_mensaje":1255,"id_sender":2,"id_reciever":1,"content":"Hola","time":1000},{"id_mensaje":1257,"id_sender":2,"id_reciever":1,"content":"Soy Pedro","time":1002},{"id_mensaje":1264,"id_sender":1,"id_reciever":2,"content":"Juegas a fútbol","time":1009}]
        elPeticionario.hacerPeticionREST(
                "GET",
                url_servidor.orElse(servidor_por_defecto) + "/recibirNuevosMensajes?id_usuario1=" + id_sender + "&id_usuario2=" + id_receiver + "&id_ultimo_mensaje=" + idUltimoMensaje,
                null,
                new PeticionarioREST.RespuestaREST() { /* se puede abreviar: (codigo, cuerpo) -> { .... } */
                    @Override
                    public void callback(int codigo, String cuerpo) throws JSONException {

                        Log.d("LogicaNegocio", "recibirNuevosMensajes(): recibo: " + cuerpo);
                        //Parseamos el JSON
                        //List<ChatMessage> losMensajes;
                        Type messageType = new TypeToken<List<ChatMessage>>() {
                        }.getType();
                        Gson gson = new Gson();
                        List<ChatMessage> messages = gson.fromJson(cuerpo, messageType);
                        responder.callback(messages);

                    }


                });


        Log.d("LogicaNegocio", "recibirNuevosMensajes(): termina");

    } // ()

    public static void modificarDatosUsuario(UserData datosNuevos, RespuestaVacia responder) {
        Log.d("primeraApp", "LogicaNegocio.comprobarUsuarioYContrasena(): empieza");

        PeticionarioREST elPeticionario = new PeticionarioREST();

        // Create a JSON object for the request body
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("id", datosNuevos.getId());
            requestBody.put("photo", Utilidades.BitmapToStringforJSON(datosNuevos.getPhoto()));
            requestBody.put("username", datosNuevos.getName());
            requestBody.put("age", datosNuevos.getAge());
            requestBody.put("description", datosNuevos.getDescription());


        } catch (JSONException e) {
            e.printStackTrace();
        }

        elPeticionario.hacerPeticionREST(
                "POST",  // Change GET to POST
                url_servidor.orElse(servidor_por_defecto) + "/modificarDatosUsuario",  // Removed query parameters
                requestBody.toString(),  // Add request body
                new PeticionarioREST.RespuestaREST() {
                    @Override
                    public void callback(int codigo, String cuerpo) throws JSONException {
                        Log.d("primeraApp", "LogicaNegocio.modificarDatosUsuario().callback: recibo: " + cuerpo);
                        //Parseamos el JSON


                        responder.callback();
                    }
                });

        Log.d("primeraApp", "LogicaNegocio.modificarDatosUsuario(): termina");
    }

    public static void publicarMensaje(String content, int id_sender, int id_reciever, RespuestaVacia responder) {
        Log.d("PublicarMensaje", "Empieza");

        PeticionarioREST elPeticionario = new PeticionarioREST();

        // Create a JSON object for the request body
        JSONObject mensajeEnviadoJSON = new JSONObject();
        try {
            mensajeEnviadoJSON.put("content", content);
            mensajeEnviadoJSON.put("id_sender", id_sender);
            mensajeEnviadoJSON.put("id_reciever", id_reciever);


        } catch (JSONException e) {
            e.printStackTrace();
        }

        elPeticionario.hacerPeticionREST(
                "POST",  // Change GET to POST
                url_servidor.orElse(servidor_por_defecto) + "/publicarMensaje",  // Removed query parameters
                mensajeEnviadoJSON.toString(),  // Add request body
                new PeticionarioREST.RespuestaREST() {
                    @Override
                    public void callback(int codigo, String cuerpo) throws JSONException {
                        Log.d("PublicarMensaje", "enviamos: " + content + "a " + id_reciever);
                        //Parseamos el JSON


                        responder.callback();
                    }
                });

        Log.d("PublicarMensaje", "Acaba");

    }

    public static void encontrarDatosUltimosMensajes(int id_usuario, long timestamp_ultimo_mensaje, RespuestaNuevosMensajes responder) {
        Log.d("LogicaNegocio", "LogicaNegocio.encontrarDatosUltimosMensajes(): empieza");

        PeticionarioREST elPeticionario = new PeticionarioREST();
        //http://172.20.10.2:8080/nuestroChat?id_usuario1=1&id_usuario2=2
        //[{"id_mensaje":1255,"id_sender":2,"id_reciever":1,"content":"Hola","time":1000},{"id_mensaje":1257,"id_sender":2,"id_reciever":1,"content":"Soy Pedro","time":1002},{"id_mensaje":1264,"id_sender":1,"id_reciever":2,"content":"Juegas a fútbol","time":1009}]
        elPeticionario.hacerPeticionREST(
                "GET",
                url_servidor.orElse(servidor_por_defecto) + "/encontrar_datos_ultimos_mensajes?id_usuario=" + id_usuario +"&timestamp_ultimo_mensaje=" + timestamp_ultimo_mensaje,
                null,
                new PeticionarioREST.RespuestaREST() { /* se puede abreviar: (codigo, cuerpo) -> { .... } */
                    @Override
                    public void callback(int codigo, String cuerpo) throws JSONException {

                        Log.d("LogicaNegocio", "encontrarDatosUltimosMensajes().callback: recibo: " + cuerpo);
                        //Parseamos el JSON
                        //List<ChatMessage> losMensajes;
                        Type messageType = new TypeToken<List<ChatList>>() {
                        }.getType();
                        Gson gson = new Gson();
                        List<ChatList> messages = gson.fromJson(cuerpo, messageType);
                        responder.callback(messages);
                    }


                });
        //Log.d("LogicaNegocio", "encontrarDatosUltimosMensajes() id_usuario= "+id_usuario+" timestamp_ultimo_mensaje = "+ timestamp_ultimo_mensaje);
        Log.d("LogicaNegocio", "encontrarDatosUltimosMensajes: termina");

    } // ()

    public static void comprobarUsuarioYContrasena(String username, String password, Respuesta_int responder) {
        Log.d("primeraApp", "LogicaNegocio.comprobarUsuarioYContrasena(): empieza");

        PeticionarioREST elPeticionario = new PeticionarioREST();

        elPeticionario.hacerPeticionREST(
                "GET",
                url_servidor.orElse(servidor_por_defecto) + "/comprobarContrasena?username=" + username + "&password=" + password,
                null,
                new PeticionarioREST.RespuestaREST() { /* se puede abreviar: (codigo, cuerpo) -> { .... } */
                    @Override
                    public void callback(int codigo, String cuerpo) throws JSONException {


                        Log.d("primeraApp", "LogicaNegocio.comprobarUsuarioYContrasena().callback: recibo: " + cuerpo);
                        //Parseamos el JSON
                        JsonObject obj = Utilidades.JsonarrayAJsonobject(cuerpo);

                        int id_usuario = obj.get("id_usuario").getAsInt();
                        Log.d("login", "id_usuario: " + id_usuario);
                        responder.callback(id_usuario);

                    }


                });


        Log.d("primeraApp", "LogicaNegocio.pedirAlgoAlServidorRest(): termina");

    } // ()

} // class
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

