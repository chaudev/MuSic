import {AppSetting} from './settingApp';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import {getDarkmode} from './app/appSetting';
import {color} from './settingApp';
import {Screens} from '~/navigation/home';
import {DrawerContent} from '~/navigation/drawer';

// redux
import {useDispatch, useSelector} from 'react-redux';
import theme, {
  setDarkMode,
  setMainColor,
  setSecColor,
} from '~/store/reducers/theme';

const Drawer = createDrawerNavigator();

const MainNav = () => {
  const dispatch = useDispatch();
  const mainColor = useSelector(state => state.theme.mainColor);
  const secColor = useSelector(state => state.theme.secColor);

  const [progress, setProgress] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(true);

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  useEffect(() => {
    getSettingApp();
  }, []);

  const getSettingApp = async () => {
    const dark = await getDarkmode();
    console.log('dark: ', dark);
    if (dark) {
      await darkMode();
    } else {
      await lightMode();
    }

    setLoading(false);
  };

  const darkMode = () => {
    dispatch(setDarkMode(true));
    dispatch(setMainColor('#000'));
    dispatch(setSecColor('#fff'));
  };

  const lightMode = () => {
    dispatch(setDarkMode(false));
    dispatch(setMainColor('#fff'));
    dispatch(setSecColor('#000'));
  };

  const animatedStyle = {borderRadius, transform: [{scale}]};

  return (
    <View style={{backgroundColor: secColor, flex: 1}}>
      {!loading && (
        <Drawer.Navigator
          drawerType="slide"
          overlayColor="transparent"
          drawerStyle={styles.drawerStyles}
          sceneContainerStyle={{backgroundColor: secColor}}
          drawerContent={props => {
            setProgress(props.progress);
            return <DrawerContent {...props} />;
          }}>
          <Drawer.Screen name="Screens">
            {props => <Screens {...props} style={animatedStyle} />}
          </Drawer.Screen>
          <Drawer.Screen name="set">
            {props => <AppSetting {...props} style={animatedStyle} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      )}
    </View>
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
  drawerStyles: {flex: 1, width: '50%', backgroundColor: 'transparent'},
  drawerItem: {alignItems: 'flex-start', marginVertical: 0},
  drawerLabel: {color: 'white', marginLeft: -16},
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export {MainNav};
