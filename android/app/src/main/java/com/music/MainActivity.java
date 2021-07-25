package com.music;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.config.ReactFeatureFlags;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, R.style.SplashScreenTheme);  // here
    super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "MuSic";
  }
}
