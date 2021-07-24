import {HomeScreen} from './app';

import React from 'react';
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
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{flex: 1}}>
      <StatusBar
        backgroundColor={settings.colors.secondColor}
        barStyle="light-content"
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
            borderColor: settings.colors.mainColor,
          }}
        />
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

      <View
        style={{width: '100%', paddingHorizontal: 10, alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 14,
            color: settings.colors.mainColor,
            fontWeight: 'bold',
          }}>
          Nguyễn Phúc Bảo Châu
        </Text>

        <Text
          style={{
            fontSize: 10,
            color: settings.colors.mainColor,
            marginTop: 3,
          }}>
          chau.02it@gmail.com
        </Text>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginTop: 30,
        }}>
        <Ionicons
          name="settings-sharp"
          size={18}
          color={settings.colors.mainColor}
        />
        <Text
          style={{
            color: settings.colors.mainColor,
            marginLeft: 10,
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          Cài đặt
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginTop: 30,
        }}>
        <FontAwesome5
          name="theater-masks"
          size={14}
          color={settings.colors.mainColor}
        />
        <Text
          style={{
            color: settings.colors.mainColor,
            marginLeft: 10,
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          Giao diện
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginTop: 30,
        }}>
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={18}
          color={settings.colors.mainColor}
        />
        <Text
          style={{
            color: settings.colors.mainColor,
            marginLeft: 10,
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          Dark mode
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
        <Ionicons
          name="ios-log-out"
          size={18}
          color={settings.colors.mainColor}
        />
        <Text
          style={{
            color: settings.colors.mainColor,
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

const Draw = () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};

  return (
    <ImageBackground
      style={{flex: 1, backgroundColor: settings.colors.secondColor}}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{flex: 1}}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={props => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen name="Screens">
          {props => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </ImageBackground>
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

export {Draw};
