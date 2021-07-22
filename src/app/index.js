import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import MusicFiles, {
  Constants,
  CoverImage,
} from 'react-native-get-music-files-v3dev-test';
import {RenderItem} from './itemSong';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';

var Sound = require('react-native-sound');
import {settings} from '../config';

// Enable playback in silence mode
Sound.setCategory('Playback');

var whoosh = undefined;

let xs = 0;
let ys = 50;

let interVal = '';

let ro = '';

let spinValue = new Animated.Value(0);

export const HomeScreen = () => {
  const sortBy = Constants.SortBy.Title;
  const sortOrder = Constants.SortOrder.Ascending;

  const [songs, setSongs] = useState('');
  const [playing, setPlaying] = useState('');
  const [isPause, setIsPause] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrent] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [dur, setDur] = useState(0);
  const [cur, setCur] = useState(0);

  Animated.timing(spinValue, {
    toValue: cur / 60,
    duration: 3000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    getAllSongs();
  }, []);

  const playMu = data => {
    initInterval();
    setPlaying(data);
    setIsPause(false);

    if (whoosh !== undefined) {
      whoosh.stop();
    }

    whoosh = new Sound(data?.path, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      // loaded successfully
      console.log(
        'duration in seconds: ' +
          whoosh.getDuration() +
          'number of channels: ' +
          whoosh.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      whoosh.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });

      setDuration(toHHMMSS(whoosh.getDuration()));
      setDur(parseInt(whoosh.getDuration().toFixed(0)));
      ys = parseInt(whoosh.getDuration().toFixed(0));

      interVal = setInterval(() => {
        xs++;
        setCurrent(toHHMMSS(xs));
        setCur(xs);
        if (xs >= ys) {
          initInterval();
          nextSong();
        }
      }, 1000);
    });
  };

  const initInterval = () => {
    setDuration('00:00');
    setCurrent('00:00');
    setCur(0);
    setDur(0);
    xs = 0;
    clearInterval(interVal);
  };

  var toHHMMSS = secs => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map(v => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  };

  const nextSong = () => {
    initInterval();
    const currentSong = songs.indexOf(playing);
    playMu(songs[currentSong + 1]);
  };

  const reSong = () => {
    initInterval();
    const currentSong = songs.indexOf(playing);
    playMu(songs[currentSong - 1]);
  };

  const pauseSong = () => {
    if (whoosh !== undefined && !isPause) {
      setIsPause(true);
      whoosh.pause();
    }

    if (whoosh !== undefined && isPause) {
      setIsPause(false);
      whoosh.play();
    }
  };

  const getAllSongs = () => {
    MusicFiles.getAll({
      title: true,
      cover: false,
      batchSize: 0,
      batchNumber: 0,
      minimumSongDuration: 6600,
      sortBy: Constants.SortBy.Title,
      sortOrder: Constants.SortOrder.Ascending,
    })
      .then(tracks => {
        // console.log(tracks);
        setSongs(tracks.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: settings.colors.mainColor}}>
      <View
        style={{
          height: 50,
          backgroundColor: settings.colors.mainColor,
          borderBottomWidth: 0.5,
          borderColor: '#ECEFF1',
        }}></View>
      {songs !== '' && (
        <FlatList
          data={songs}
          renderItem={({item}) => (
            <RenderItem item={item} onClick={playMu} now={playing} />
          )}
          keyExtractor={item => {
            return item?.id;
          }}
          style={{flex: 1}}
        />
      )}

      <TouchableOpacity
        activeOpacity={0.3}
        onPress={() => {
          setShowModal(true);
        }}
        activeOpacity={0.85}
        style={{
          backgroundColor: settings.colors.mainColor,
          width: '100%',
          height: 50,
          borderTopWidth: 0.5,
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
              width: 40,
              height: 40,
              backgroundColor: '#000',
              borderRadius: 500,
            }}
          />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text numberOfLines={1} style={{fontSize: 16}}>
              {playing?.title}
            </Text>
            <Text numberOfLines={1} style={{fontSize: 12}}>
              {playing?.artist}
            </Text>
          </View>
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                pauseSong();
              }}
              style={{
                width: 40,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 5,
                paddingLeft: 10,
              }}>
              {isPause ? (
                <FontAwesome5
                  name="play"
                  size={16}
                  color={settings.colors.secondColor}
                />
              ) : (
                <FontAwesome5
                  name="pause"
                  size={16}
                  color={settings.colors.secondColor}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                nextSong();
              }}
              style={{
                width: 30,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons
                name="play-skip-forward"
                size={22}
                color={settings.colors.secondColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide">
        <View style={{flex: 1}}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              height: 50,
            }}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}
              style={{
                width: 50,
                height: 50,
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingLeft: 10,
              }}>
              <Ionicons
                name="ios-chevron-back-outline"
                size={24}
                color={settings.colors.secondColor}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                flex: 1,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              ĐANG PHÁT
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}
              style={{
                width: 50,
                height: 50,
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingLeft: 10,
              }}>
              <MaterialCommunityIcons
                name="playlist-music-outline"
                size={24}
                color={settings.colors.secondColor}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Animated.View style={{transform: [{rotate: spin}]}}>
              <Image
                resizeMode="contain"
                source={require('../app/assets/images/disk.png')}
                style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: 1.2,
                }}
              />
            </Animated.View>
            {/* <Image
              resizeMode="contain"
              source={require('../app/assets/images/disk.png')}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1.2,
              }}
            /> */}
          </View>

          <View
            style={{height: 50, paddingHorizontal: 20, paddingHorizontal: 30}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                color: settings.colors.secondColor,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {playing?.title}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 12,
                color: settings.colors.secondColor,
                textAlign: 'center',
              }}>
              {playing?.artist}
            </Text>
          </View>

          <View style={{height: 50, paddingHorizontal: 20}}>
            <Slider
              minimumValue={0}
              maximumValue={dur}
              minimumTrackTintColor={settings.colors.secondColor}
              thumbTintColor={settings.colors.secondColor}
              maximumTrackTintColor="#000000"
              value={cur}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <Text style={{color: settings.colors.secondColor}}>
                {currentTime}
              </Text>
              <View style={{flex: 1}} />
              <Text style={{color: settings.colors.secondColor}}>
                {duration}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -30,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  reSong();
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 500,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: settings.colors.secondColor,

                  shadowColor: settings.colors.secondColor,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}>
                <Ionicons
                  name="play-skip-back"
                  size={18}
                  color={settings.colors.mainColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  pauseSong();
                }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 500,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 40,
                  backgroundColor: settings.colors.secondColor,

                  shadowColor: settings.colors.secondColor,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}>
                {isPause ? (
                  <FontAwesome5
                    name="play"
                    size={18}
                    color={settings.colors.mainColor}
                    style={{marginLeft: 3}}
                  />
                ) : (
                  <FontAwesome5
                    name="pause"
                    size={18}
                    color={settings.colors.mainColor}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  nextSong();
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 500,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: settings.colors.secondColor,

                  shadowColor: settings.colors.secondColor,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}>
                <Ionicons
                  name="play-skip-forward"
                  size={18}
                  color={settings.colors.mainColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
