package com.example.tinder_upv;

import android.graphics.Bitmap;

public class UserData {
    private Bitmap photo;
    private int age;

    private int id_usuario;
    private String name;
    private String description;

    public UserData(Bitmap photo, int id_usuario, int age, String name, String description) {
        this.photo = photo;
        this.age = age;
        this.name = name;
        this.description = description;
        this.id_usuario = id_usuario;
    }

    public Bitmap getPhoto() {
        return photo;
    }

    public void setPhoto(Bitmap photo) {
        this.photo = photo;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getId(){return this.id_usuario;}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

