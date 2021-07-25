package com.music;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.config.ReactFeatureFlags;

import org.devio.rn.splashscreen.SplashScreen;
public class MainActivity extends ReactActivity {

//  @Override
//  protected void onCreate(Bundle savedInstanceState) {
//    SplashScreen.show(this);  // here
//  }

  @Override
  protected String getMainComponentName() {
//    SplashScreen.show(this);

    return "MuSic";
  }
}
