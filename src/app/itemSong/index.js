import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Modal,
  Animated,
} from 'react-native';
import {
  settings,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '../../config';
import {color} from '../../settingApp';

const RenderItem = ({item, onClick, now}) => {
  const click = () => {
    console.log(item);
    onClick(item);
  };

  const isPlaying = () => {
    return item?.id === now?.id ? true : false;
  };

  return (
    <TouchableOpacity
      onPress={() => {
        click();
      }}
      activeOpacity={0.85}
      style={{
        backgroundColor: color.mainColor,
        width: '100%',
        height: 60,
        borderBottomWidth: 0.2,
        borderColor: color.secondColor === '#000' ? '#ECEFF1' : '#424242',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 500,
          }}>
          {color.secondColor === '#000' ? (
            <Image
              resizeMode="contain"
              source={require('../../app/assets/images/disk.png')}
              style={{width: 50, height: 50}}
            />
          ) : (
            <Image
              resizeMode="contain"
              source={require('../../app/assets/images/disk-2.png')}
              style={{width: 50, height: 50}}
            />
          )}
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            numberOfLines={1}
            style={{fontSize: 16, color: color.secondColor}}>
            {item?.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{fontSize: 12, color: color.secondColor}}>
            {item?.artist}
          </Text>
        </View>
        <View
          style={{
            width: 40,
            height: 40,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          {isPlaying() && (
            <MaterialCommunityIcons
              name="music-note-eighth"
              size={22}
              color={color.secondColor}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {RenderItem};
