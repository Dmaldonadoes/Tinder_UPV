package com.example.tinder_upv;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.util.Log;

import com.example.tinder_upv.chat.ChatMessage;
import com.example.tinder_upv.ui.Mensajes.ChatList;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

public class Utilidades {
    public static Bitmap blobToBitmap(byte[] imageBlob){
        InputStream inputStream = new ByteArrayInputStream(imageBlob);
        Log.d("pruebas", BitmapFactory.decodeStream(inputStream).toString());
        return BitmapFactory.decodeStream(inputStream);
    }

    public static JsonObject[] convertirAJSONobject(String jsonArrayString) {
        JsonElement jsonElement = JsonParser.parseString(jsonArrayString);
        JsonArray jsonArray = jsonElement.getAsJsonArray();
        JsonObject[] jsonObjects = new JsonObject[jsonArray.size()];
        for (int i = 0; i < jsonArray.size(); i++) {
            JsonObject jsonObject = jsonArray.get(i).getAsJsonObject();
            jsonObjects[i] = jsonObject;
        }
        return jsonObjects;
    }

    public static JsonObject JsonarrayAJsonobject(String cuerpo){
        JsonArray jsonArray = new Gson().fromJson(cuerpo, JsonArray.class);
        JsonObject obj = jsonArray.get(0).getAsJsonObject();
        return obj;
    }
    public static Bitmap obtenerFotoJSON(JsonObject obj){
        JsonObject photoObj = obj.getAsJsonObject("photo");
        JsonArray dataArr = photoObj.getAsJsonArray("data");
        byte[] photoBytes = new byte[dataArr.size()];
        for (int i = 0; i < dataArr.size(); i++) {
            photoBytes[i] = dataArr.get(i).getAsByte();
        }
        Bitmap laFotoBitmap = BitmapFactory.decodeByteArray(photoBytes, 0, photoBytes.length);
        return laFotoBitmap;
    }

    public static String BitmapToStringforJSON(Bitmap foto){
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        foto.compress(Bitmap.CompressFormat.JPEG, 40, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        String encodedImage = Base64.encodeToString(byteArray, Base64.DEFAULT);
        return encodedImage;

    }

    public static int getIdUltimoMensaje(List<ChatMessage> elArray, int elAnteriorId){
        int res=elAnteriorId;
        if (!elArray.isEmpty()) {
            res = elArray.get(elArray.size() - 1).getId_mensaje();
            Log.d("getIdUltimoMensaje", "getIdUltimoMensaje: " + res);
            return res;
        }
        return res;
    }

    public static long getTimeStampUltimoChatList(List<ChatList> elArray, long elAnteriorTimeStamp){
        long res=elAnteriorTimeStamp;
        if (!elArray.isEmpty()) {
            res = elArray.get(elArray.size() - 1).getTimestamp();
            Log.d("getIdUltimoMensaje", "getIdUltimoMensaje: " + res);
            return res;
        }
        return res;
    }

    public static String convertirTimestampAHoraEspañola(long timestamp) {
        SimpleDateFormat format = new SimpleDateFormat("HH:mm", Locale.getDefault());
        format.setTimeZone(TimeZone.getTimeZone("Europe/Madrid"));
        return format.format(new Date(timestamp));
    }

}
