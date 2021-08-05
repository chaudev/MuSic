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
import {color} from '../../settingApp';

// redux
import {useSelector} from 'react-redux';

const RenderItemType = ({item, onClick, now}) => {
  const mainColor = useSelector(state => state.theme.mainColor);
  const secColor = useSelector(state => state.theme.secColor);

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
        borderBottomWidth: isPlaying() ? 3 : 0,
        borderColor: isPlaying() ? secColor : mainColor,
      }}>
      <Text
        style={{
          fontSize: isPlaying() ? 16 : 14,
          color: isPlaying() ? secColor : 'grey',
          fontWeight: isPlaying() ? 'bold' : '100',
        }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export {RenderItemType};
