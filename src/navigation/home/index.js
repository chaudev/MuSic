import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

// Screen
import {HomeScreen} from '~/app';

const Stack = createStackNavigator();

export const Screens = ({style}) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerShown: false,
        }}>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
});
