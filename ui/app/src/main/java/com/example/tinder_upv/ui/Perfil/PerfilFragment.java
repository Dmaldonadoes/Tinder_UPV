package com.example.tinder_upv.ui.Perfil;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.os.ParcelFileDescriptor;
import android.provider.MediaStore;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.Manifest;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.example.tinder_upv.LogicaNegocio;
import com.example.tinder_upv.Login;
import com.example.tinder_upv.MainActivity;
import com.example.tinder_upv.R;
import com.example.tinder_upv.UserData;
import com.example.tinder_upv.databinding.FragmentPerfilBinding;

import java.io.FileDescriptor;
import java.io.IOException;

public class PerfilFragment extends Fragment {

    private FragmentPerfilBinding binding;
    private static final int REQUEST_IMAGE_CAPTURE = 1;
    private static final int REQUEST_IMAGE_SELECT = 2;
    private static final int MY_PERMISSIONS_REQUEST_CAMERA = 3;
    private Bitmap foto_perfil;
    ImageView fotoPerfil;
    EditText textoNombrePerfil;
    EditText textoEdadPerfil;
    EditText textoDescripcionPerfil;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        PerfilViewModel perfilViewModel =
                new ViewModelProvider(this).get(PerfilViewModel.class);

        binding = FragmentPerfilBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        // Configurar el botón
        Button btnCerrarSesion = root.findViewById(R.id.buttoncerrarsesion);
        Button btnEditarPerfil = root.findViewById(R.id.botoneditarperfil);
        ImageButton btnSelectImage = root.findViewById(R.id.seleccionarFotoGaleria);
        //ImageButton btnTakePhoto = root.findViewById(R.id.hacerFoto);
        fotoPerfil = root.findViewById(R.id.fotoperfil);
        textoNombrePerfil = root.findViewById(R.id.nombreperfil);
        textoEdadPerfil = root.findViewById(R.id.edadperfil);
        textoDescripcionPerfil = root.findViewById(R.id.descripcionperfil);
        LogicaNegocio.recibirDatosUsuario(MainActivity.id_usuario, (resultados) -> {
            fotoPerfil.setImageBitmap(resultados.getPhoto());
            textoNombrePerfil.setText(resultados.getName());
            textoEdadPerfil.setText("" + resultados.getAge());
            foto_perfil = resultados.getPhoto();
            Log.d("recobirDatosUsuario", "onCreateView: " + resultados.getAge());
            textoDescripcionPerfil.setText(resultados.getDescription());
            Log.d("recobirDatosUsuario", resultados.toString());

        });
        btnSelectImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                selectImageFromGallery();
            }
        });

        /*btnTakePhoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                takePhoto();
            }
        });*/
        btnCerrarSesion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Crear la intención para cambiar de actividad
                Intent intent = new Intent(getActivity(), Login.class);
                startActivity(intent);
            }
        });
        btnEditarPerfil.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                boton_enviarDatosPerfil();
            }
        });
        return root;

    }

    //Métodos privados
    private void takePhoto() {
        if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.CAMERA)
                != PackageManager.PERMISSION_GRANTED) {
            // Permission is not granted
            // Should we show an explanation?
            if (ActivityCompat.shouldShowRequestPermissionRationale(getActivity(),
                    Manifest.permission.CAMERA)) {
                // Show an explanation to the user *asynchronously* -- don't block
                // this thread waiting for the user's response! After the user
                // sees the explanation, try again to request the permission.
            } else {
                // No explanation needed; request the permission
                ActivityCompat.requestPermissions(getActivity(),
                        new String[]{Manifest.permission.CAMERA},
                        MY_PERMISSIONS_REQUEST_CAMERA);
                // MY_PERMISSIONS_REQUEST_CAMERA is an
                // app-defined int constant. The callback method gets the
                // result of the request.
            }
        } else {
            // Permission has already been granted
            Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            if (takePictureIntent.resolveActivity(requireActivity().getPackageManager()) != null) {
                startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        switch (requestCode) {
            case MY_PERMISSIONS_REQUEST_CAMERA: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    // permission was granted, yay! Do the
                    // camera-related task you need to do.
                    takePhoto();
                } else {
                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.
                }
                return;
            }
            // other 'case' lines to check for other
            // permissions this app might request.
        }
    }


    private void selectImageFromGallery() {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("image/*");
        startActivityForResult(intent, REQUEST_IMAGE_SELECT);
    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == REQUEST_IMAGE_CAPTURE) {
                Bundle extras = data.getExtras();
                Bitmap imageBitmap = (Bitmap) extras.get("data");
                // Asignar la imagen al ImageView
                foto_perfil = imageBitmap;
                fotoPerfil.setImageBitmap(imageBitmap);

            } else if (requestCode == REQUEST_IMAGE_SELECT) {
                Uri selectedImage = data.getData();
                Bitmap imageBitmap = getBitmapFromUri(selectedImage);
                // Asignar la imagen al ImageView
                foto_perfil = imageBitmap;
                fotoPerfil.setImageBitmap(imageBitmap);
            }
        }
    }
    private Bitmap getBitmapFromUri(Uri uri) {
        try {
            ParcelFileDescriptor parcelFileDescriptor =
                    requireActivity().getContentResolver().openFileDescriptor(uri, "r");
            FileDescriptor fileDescriptor = parcelFileDescriptor.getFileDescriptor();
            Bitmap imageBitmap = BitmapFactory.decodeFileDescriptor(fileDescriptor);
            parcelFileDescriptor.close();
            return imageBitmap;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private void boton_enviarDatosPerfil() {
        Log.d("prueba", "boton_enviarDatosPerfil: empieza");
        String nombreMandar = textoNombrePerfil.getText().toString();
        String descripcionMandar = textoDescripcionPerfil.getText().toString();
        Log.d("prueba", "boton_enviarDatosPerfil: sigue");
        int edadMandar = Integer.parseInt(textoEdadPerfil.getText().toString());
        Log.d("prueba", "boton_enviarDatosPerfil: sigue 2");
        Bitmap fotoMandar = foto_perfil;
        UserData datosMandar = new UserData(fotoMandar, MainActivity.id_usuario, edadMandar, nombreMandar, descripcionMandar);
        Log.d("prueba", "boton_enviarDatosPerfil: sigue 3");

        LogicaNegocio.modificarDatosUsuario(datosMandar, () -> {

            Log.d("prueba", "MainActivity.boton_modificar datpos(): se han actualizado los datos" );



        });
        Log.d("prueba", "MainActivity.boton_pedir_pulsado(): acaba");
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}