import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import {MainNav} from './src';
import {NavigationContainer} from '@react-navigation/native';

const per = {'android.permission.READ_EXTERNAL_STORAGE': 'granted'};

LogBox.ignoreAllLogs();

const App = () => {
  const [permissed, setPermissed] = useState(false);

  useEffect(() => {
    getPer();
  }, []);

  const getPer = () => {
    requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then(e => {
      if ((e = per)) {
        setPermissed(true);
      } else {
        getPer();
      }
    });
  };

  return <NavigationContainer>{permissed && <MainNav />}</NavigationContainer>;
};

export default App;
