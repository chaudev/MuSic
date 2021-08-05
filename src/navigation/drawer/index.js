import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {FontAwesome5, Ionicons, MaterialCommunityIcons} from '~/config';
import {saveDarkmode} from '~/app/appSetting';

// redux
import {useSelector, useDispatch} from 'react-redux';
import {setDarkMode, setSecColor, setMainColor} from '~/store/reducers/theme';

export const DrawerContent = props => {
  const dispatch = useDispatch();

  const mainColor = useSelector(state => state.theme.mainColor);
  const secColor = useSelector(state => state.theme.secColor);
  const isDark = useSelector(state => state.theme.isDarkMode);

  const handleSetDark = async () => {
    dispatch(setMainColor(mainColor == '#fff' ? '#000' : '#fff'));
    dispatch(setSecColor(secColor == '#000' ? '#fff' : '#000'));
    dispatch(setDarkMode(!isDark));
    saveDarkmode(!isDark);
  };

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: secColor,
      }}>
      <StatusBar
        translucent={true}
        barStyle={mainColor !== '#fff' ? 'light-content' : 'dark-content'}
        backgroundColor="rgba(0,0,0,0)"
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
            borderColor: secColor,
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
            color: mainColor,
            fontWeight: 'bold',
          }}>
          Nguyễn Phúc Bảo Châu
        </Text>

        <Text
          style={{
            fontSize: 10,
            color: mainColor,
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
        <Ionicons name="settings-sharp" size={18} color={mainColor} />
        <Text
          style={{
            color: mainColor,
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
        <FontAwesome5 name="theater-masks" size={14} color={mainColor} />
        <Text
          style={{
            color: mainColor,
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
          color={mainColor}
        />
        <Text
          style={{
            color: mainColor,
            marginLeft: 10,
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          Dark mode ({!isDark ? 'tắt' : 'mở'})
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
        <Ionicons name="ios-log-out" size={18} color={mainColor} />
        <Text
          style={{
            color: mainColor,
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
