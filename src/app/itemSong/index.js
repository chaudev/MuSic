import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';

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
            backgroundColor: '#000',
            borderRadius: 500,
          }}
        />
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
