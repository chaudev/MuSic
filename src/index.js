import {HomeScreen} from './app';
import {AppSetting} from './settingApp';

import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import {
  FontAwesome5,
  settings,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from './config';

import {saveDarkmode, getDarkmode} from './app/appSetting';
import {color} from './settingApp';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Screens = ({style}) => {
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

const DrawerContent = props => {
  const [darkMode, setDarkMode] = useState(false);

  const handleSetDark = () => {
    saveDarkmode(!darkMode);
    setDarkMode(!darkMode);
  };

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{
        flex: 1,
      }}>
      <StatusBar
        backgroundColor={color.mainColor}
        barStyle={
          color.secondColor !== '#000' ? 'light-content' : 'dark-content'
        }
      />
      <View
        style={{
          width: '100%',
          height: 100,
          marginTop: 50,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 82,
            height: 82,
            marginBottom: -81,
            borderRadius: 1000,
            borderWidth: 2,
            borderColor: color.mainColor,
          }}
        />
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 1000,
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: 80,
              height: 80,
              borderRadius: 1000,
            }}
            source={{
              uri: 'https://bom.to/fOsNLnTAyTL5zf',
            }}
          />
        </View>
      </View>

      <View
        style={{width: '100%', paddingHorizontal: 10, alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 14,
            color: color.mainColor,
            fontWeight: 'bold',
          }}>
          Nguyễn Phúc Bảo Châu
        </Text>

        <Text
          style={{
            fontSize: 10,
            color: color.mainColor,
            marginTop: 3,
          }}>
          chau.02it@gmail.com
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('set');
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginTop: 30,
        }}>
        <Ionicons name="settings-sharp" size={18} color={color.mainColor} />
        <Text
          style={{
            color: color.mainColor,
            marginLeft: 10,
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          Cài đặt
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('set');
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginTop: 30,
        }}>
        <FontAwesome5 name="theater-masks" size={14} color={color.mainColor} />
        <Text
          style={{
            color: color.mainColor,
            marginLeft: 10,
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          Giao diện
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          handleSetDark();
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginTop: 30,
        }}>
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={18}
          color={color.mainColor}
        />
        <Text
          style={{
            color: color.mainColor,
            marginLeft: 10,
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          Dark mode ({!darkMode ? 'tắt' : 'mở'})
        </Text>
      </TouchableOpacity>

      <View style={{flex: 1}} />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginBottom: 80,
        }}>
        <Ionicons name="ios-log-out" size={18} color={color.mainColor} />
        <Text
          style={{
            color: color.mainColor,
            marginLeft: 10,
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const MainNav = () => {
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
    console.log('getSetting');

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
    color.mainColor = '#000';
    color.secondColor = '#fff';
  };

  const lightMode = () => {
    color.mainColor = '#fff';
    color.secondColor = '#000';
  };

  const animatedStyle = {borderRadius, transform: [{scale}]};

  return (
    <View style={{backgroundColor: color.secondColor, flex: 1}}>
      {!loading && (
        <Drawer.Navigator
          drawerType="slide"
          overlayColor="transparent"
          drawerStyle={styles.drawerStyles}
          sceneContainerStyle={{backgroundColor: color.secondColor}}
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
