import React from 'react';
import {View, LogBox} from 'react-native';

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import {HomeScreen} from './src';

// npx react-native run-android

LogBox.ignoreAllLogs();

const App = () => {
  requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then(
    statuses => {
      console.log(
        'READ_EXTERNAL_STORAGE',
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE],
      );
    },
  );

  return (
    <View style={{flex: 1}}>
      <HomeScreen />
    </View>
  );
};

export default App;
