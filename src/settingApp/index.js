import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Vibration} from 'react-native';
import {
  settings,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from '../config';
import {main} from '../app/css';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const colors = settings.colors;

export const AppSetting = () => {
  const nav = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: colors.mainColor}}>
      <View style={main.container}>
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}
          style={main.menuButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={settings.colors.secondColor}
          />
        </TouchableOpacity>
        <Text
          onPress={() => {
            nav.openDrawer();
          }}
          style={[main.textAppName, {fontFamily: 'SVN-Bariol'}]}>
          Cài đặt
        </Text>
        <View style={{flex: 1}} />
      </View>
      <View style={{flex: 1}} />
    </View>
  );
};
