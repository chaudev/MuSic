import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Modal,
  Animated,
} from 'react-native';
import {settings} from '../../config';
import MusicFiles, {
  Constants,
  CoverImage,
} from 'react-native-get-music-files-v3dev-test';

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
        backgroundColor: '#fff',
        width: '100%',
        height: 60,
        borderWidth: 0.2,
        borderColor: '#ECEFF1',
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
          <Image
            resizeMode="contain"
            source={require('../../app/assets/images/disk.png')}
            style={{width: 50, height: 50}}
          />
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text numberOfLines={1} style={{fontSize: 16}}>
            {item?.title}
          </Text>
          <Text numberOfLines={1} style={{fontSize: 12}}>
            {item?.artist}
          </Text>
        </View>
        <View
          style={{
            width: 40,
            height: 40,
          }}>
          {isPlaying() && <Text>PLAYING</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {RenderItem};
