package com.example.tinder_upv.ui.Encontrar;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class EncontrarViewModel extends ViewModel {

    private final MutableLiveData<String> mText;

    public EncontrarViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is home fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}