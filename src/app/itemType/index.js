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

const RenderItemType = ({item, onClick, now}) => {
  const click = () => {
    onClick(item);
  };

  const isPlaying = () => {
    return item?.title === now ? true : false;
  };

  return (
    <TouchableOpacity
      onPress={() => {
        click();
      }}
      style={{
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderColor: isPlaying()
          ? settings.colors.secondColor
          : settings.colors.mainColor,
      }}>
      <Text
        style={{
          fontSize: isPlaying() ? 16 : 14,
          color: isPlaying() ? settings.colors.secondColor : 'grey',
          fontWeight: isPlaying() ? 'bold' : '100',
        }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export {RenderItemType};
