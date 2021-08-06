import {AppSetting} from './settingApp';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import {getDarkmode} from './app/appSetting';
import {AppTheme} from './changeTheme';
import {color} from './settingApp';
import {Screens} from '~/navigation/home';
import {DrawerContent} from '~/navigation/drawer';

// redux
import {useDispatch, useSelector} from 'react-redux';
import {
  setSecColor,
  setMainColorEnd,
  setMainColorStart,
  getTheme,
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
    const theme = await getTheme();
    console.log('theme: ', theme);

    await darkMode(theme);

    setLoading(false);
  };

  const darkMode = theme => {
    if (theme !== null) {
      dispatch(setMainColorStart(theme?.mainColorStart));
      dispatch(setMainColorEnd(theme?.mainColorEnd));
      dispatch(setSecColor(theme?.secColor));
    } else {
      dispatch(setMainColorStart('#fff'));
      dispatch(setMainColorEnd('#fff'));
      dispatch(setSecColor('#000'));
    }
  };

  const animatedStyle = {borderRadius, transform: [{scale}]};

  return (
    <View style={{backgroundColor: '#000', flex: 1}}>
      {!loading && (
        <Drawer.Navigator
          drawerType="slide"
          overlayColor="transparent"
          drawerStyle={styles.drawerStyles}
          sceneContainerStyle={{backgroundColor: '#000'}}
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
          <Drawer.Screen name="theme">
            {props => <AppTheme {...props} style={animatedStyle} />}
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
