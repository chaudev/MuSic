import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import {MaterialCommunityIcons} from '../../config';
import {color} from '../../settingApp';
import {Colors} from 'green-native';

// redux
import {useSelector} from 'react-redux';

const RenderItem = ({item, onClick, now}) => {
  const mainColor = useSelector(state => state.theme.mainColor);
  const secColor = useSelector(state => state.theme.secColor);
  const isDark = useSelector(state => state.theme.isDarkMode);

  const click = () => {
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
        width: '100%',
        height: 60,
        borderBottomWidth: 0.2,
        borderColor: Colors.trans10,
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
          <Text numberOfLines={1} style={{fontSize: 16, color: secColor}}>
            {item?.title}
          </Text>
          <Text numberOfLines={1} style={{fontSize: 12, color: secColor}}>
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
              color={secColor}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {RenderItem};
