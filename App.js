import React from 'react';
import {LogBox} from 'react-native';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import {Draw} from './src';
import {NavigationContainer} from '@react-navigation/native';

LogBox.ignoreAllLogs();

const App = () => {
  requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]);

  return (
    <NavigationContainer>
      <Draw />
    </NavigationContainer>
  );
};

export default App;
