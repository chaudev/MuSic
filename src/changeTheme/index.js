import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Vibration,
  ScrollView,
} from 'react-native';
import {
  settings,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from '../config';
import {main} from '../app/css';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {saveTheme} from '~/store/reducers/theme';

// redux
import {useDispatch, useSelector} from 'react-redux';
import {
  setSecColor,
  setMainColorEnd,
  setMainColorStart,
  getTheme,
} from '~/store/reducers/theme';

const colors = settings.colors;

export const color = {
  mainColor: '#fff',
  secondColor: '#000',
};

export const AppTheme = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();

  const mainColorStart = useSelector(state => state.theme.mainColorStart);
  const mainColorEnd = useSelector(state => state.theme.mainColorEnd);
  const secColor = useSelector(state => state.theme.secColor);
  const isDark = useSelector(state => state.theme.isDarkMode);

  const setColor = theme => {
    dispatch(setMainColorStart(theme?.mainColorStart));
    dispatch(setMainColorEnd(theme?.mainColorEnd));
    dispatch(setSecColor(theme?.secColor));
  };

  return (
    <LinearGradient
      colors={[mainColorStart, mainColorEnd]}
      style={{flex: 1, backgroundColor: colors.mainColor, paddingTop: 31}}>
      <View style={main.container}>
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}
          style={main.menuButton}>
          <Ionicons name="arrow-back" size={20} color={secColor} />
        </TouchableOpacity>
        <Text
          onPress={() => {
            nav.goBack();
          }}
          style={[
            main.textAppName,
            {
              fontFamily: 'SVN-Bariol',
              fontSize: 14,
              marginLeft: -10,
              color: secColor,
            },
          ]}>
          Quay lại
        </Text>
        <View style={{flex: 1}} />
      </View>
      <View style={{flex: 1}}>
        <View style={{flex: 9999}} />

        <ScrollView horizontal style={{height: 100}}>
          <View
            style={{
              height: 100,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#fff',
                  mainColorEnd: '#fff',
                  secColor: '#000',
                });
                saveTheme({
                  mainColorStart: '#fff',
                  mainColorEnd: '#fff',
                  secColor: '#000',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#fff', '#fff']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#000',
                  mainColorEnd: '#000',
                  secColor: '#fff',
                });
                saveTheme({
                  mainColorStart: '#000',
                  mainColorEnd: '#000',
                  secColor: '#fff',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#000', '#000']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#ffad47',
                  mainColorEnd: '#ff448c',
                  secColor: '#fff',
                });
                saveTheme({
                  mainColorStart: '#ffad47',
                  mainColorEnd: '#ff448c',
                  secColor: '#fff',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#ffad47', '#ff448c']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#ffd746',
                  mainColorEnd: '#ff984c',
                  secColor: '#000',
                });
                saveTheme({
                  mainColorStart: '#ffd746',
                  mainColorEnd: '#ff984c',
                  secColor: '#000',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#ffd746', '#ff984c']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#f3f347',
                  mainColorEnd: '#32b46c',
                  secColor: '#000',
                });
                saveTheme({
                  mainColorStart: '#f3f347',
                  mainColorEnd: '#32b46c',
                  secColor: '#000',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#f3f347', '#32b46c']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#F44336',
                  mainColorEnd: '#000',
                  secColor: '#fff',
                });
                saveTheme({
                  mainColorStart: '#F44336',
                  mainColorEnd: '#000',
                  secColor: '#fff',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#F44336', '#000']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#c6c6c6',
                  mainColorEnd: '#9f9f9f',
                  secColor: '#000',
                });
                saveTheme({
                  mainColorStart: '#c6c6c6',
                  mainColorEnd: '#9f9f9f',
                  secColor: '#000',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#c6c6c6', '#9f9f9f']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#2de4bf',
                  mainColorEnd: '#339790',
                  secColor: '#000',
                });
                saveTheme({
                  mainColorStart: '#2de4bf',
                  mainColorEnd: '#339790',
                  secColor: '#000',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#2de4bf', '#339790']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#f61979',
                  mainColorEnd: '#8a3eff',
                  secColor: '#fff',
                });
                saveTheme({
                  mainColorStart: '#f61979',
                  mainColorEnd: '#8a3eff',
                  secColor: '#fff',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#f61979', '#8a3eff']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#ffda50',
                  mainColorEnd: '#ff3ed9',
                  secColor: '#fff',
                });
                saveTheme({
                  mainColorStart: '#ffda50',
                  mainColorEnd: '#ff3ed9',
                  secColor: '#fff',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#ffda50', '#ff3ed9']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#A5D6A7',
                  mainColorEnd: '#1B5E20',
                  secColor: '#fff',
                });
                saveTheme({
                  mainColorStart: '#A5D6A7',
                  mainColorEnd: '#1B5E20',
                  secColor: '#fff',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#A5D6A7', '#1B5E20']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#BF360C',
                  mainColorEnd: '#1B5E20',
                  secColor: '#fff',
                });
                saveTheme({
                  mainColorStart: '#BF360C',
                  mainColorEnd: '#1B5E20',
                  secColor: '#fff',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#BF360C', '#1B5E20']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#1B5E20',
                  mainColorEnd: '#BF360C',
                  secColor: '#fff',
                });
                saveTheme({
                  mainColorStart: '#1B5E20',
                  mainColorEnd: '#BF360C',
                  secColor: '#fff',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#1B5E20', '#BF360C']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#BF360C',
                  mainColorEnd: '#FFAB91',
                  secColor: '#fff',
                });
                saveTheme({
                  mainColorStart: '#BF360C',
                  mainColorEnd: '#FFAB91',
                  secColor: '#fff',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#BF360C', '#FFAB91']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setColor({
                  mainColorStart: '#FFAB91',
                  mainColorEnd: '#BF360C',
                  secColor: '#fff',
                });
                saveTheme({
                  mainColorStart: '#FFAB91',
                  mainColorEnd: '#BF360C',
                  secColor: '#fff',
                });
              }}
              style={{width: 80, height: 100}}>
              <LinearGradient
                colors={['#FFAB91', '#BF360C']}
                style={{flex: 1, width: '100%'}}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};
