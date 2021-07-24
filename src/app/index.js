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
  StatusBar,
} from 'react-native';
import {main, modal} from './css';
import MusicFiles, {Constants} from 'react-native-get-music-files-v3dev-test';
import BackgroundTimer from 'react-native-background-timer';
import {RenderItem} from './itemSong';
import {RenderItemType} from './itemType';
import Slider from '@react-native-community/slider';
import {
  getCurrentSong,
  saveCurrentSong,
  savePlaylist,
  getPlaylist,
  saveFavourite,
  getFavourite,
} from './appSetting';
import {
  settings,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from '../config';
import {toHHMMSS} from './function';
import {useNavigation, useIsFocused} from '@react-navigation/native';

var Sound = require('react-native-sound');

Sound.setCategory('Playback');

var whoosh = undefined;

let xs = 0;
let ys = 50;

let spinValue = new Animated.Value(0);

export const HomeScreen = () => {
  const nav = useNavigation();
  const focused = useIsFocused();

  const sortBy = Constants.SortBy.Title;
  const sortOrder = Constants.SortOrder.Ascending;

  const [songs, setSongs] = useState('');
  const [songIDs, setSongIDs] = useState('');
  const [playing, setPlaying] = useState('');
  const [isPause, setIsPause] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrent] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [dur, setDur] = useState(0);
  const [cur, setCur] = useState(0);

  const [type, setType] = useState('Tất cả');
  const [curType, setCurType] = useState(0);
  const [faMu, setFaMu] = useState('');

  Animated.timing(spinValue, {
    toValue: cur / 60,
    duration: 3000,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    console.log(focused);
    // if (focused) {
    //   <StatusBar
    //     backgroundColor={settings.colors.mainColor}
    //     barStyle="dark-content"
    //   />;
    // } else {
    //   <StatusBar
    //     backgroundColor={settings.colors.secondColor}
    //     barStyle="light-content"
    //   />;
    // }
  }, [focused]);

  useEffect(() => {
    getSavedSongs();
    getSong();
    getFaSongs();
    getAllSongs();
  }, []);

  useEffect(() => {
    if (songs !== '') {
      getSongIDs();
    }
  }, [songs]);

  const getSong = async () => {
    const mu = await getCurrentSong();
    setPlaying(mu);
  };

  const getSongIDs = async () => {
    let temp = [];
    for (let index = 0; index < songs.length; index++) {
      temp.push(songs[index]?.id);
    }
    setSongIDs(temp);
  };

  const getSavedSongs = async () => {
    const res = await getPlaylist();
    setSongs(res);
  };

  const getFaSongs = async () => {
    const res = await getFavourite();
    setFaMu(res);
  };

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

      saveCurrentSong(data);

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

      BackgroundTimer.runBackgroundTimer(() => {
        xs++;
        setCurrent(toHHMMSS(xs));
        setCur(xs);
        if (xs >= ys) {
          initInterval();
          nextSong();
        }
      }, 500);
    });
  };

  const initInterval = () => {
    setDuration('00:00');
    setCurrent('00:00');
    setCur(0);
    setDur(0);
    xs = 0;
    BackgroundTimer.stopBackgroundTimer();
  };

  const nextSong = () => {
    initInterval();
    const currentSong = songIDs.indexOf(playing?.id);
    playMu(songs[currentSong + 1]);
  };

  const reSong = () => {
    initInterval();
    const currentSong = songIDs.indexOf(playing?.id);
    playMu(songs[currentSong - 1]);
  };

  const pauseSong = () => {
    if (whoosh !== undefined && !isPause) {
      setIsPause(true);
      whoosh.pause();

      BackgroundTimer.stopBackgroundTimer();
    }

    if (playing !== '' && isPause && whoosh === undefined) {
      setIsPause(false);
      playMu(playing);
    }

    if (whoosh !== undefined && isPause) {
      setIsPause(false);
      whoosh.play();

      BackgroundTimer.runBackgroundTimer(() => {
        xs++;
        setCurrent(toHHMMSS(xs));
        setCur(xs);
        if (xs >= ys) {
          initInterval();
          nextSong();
        }
      }, 500);
    }
  };

  const getAllSongs = () => {
    console.log('run');
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
        // console.log(tracks.results[0]);
        savePlaylist(tracks.results);
        setSongs(tracks.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const clickType = i => {
    setType(i.title);
    if (i.title === 'Tất cả') {
      setCurType(0);
    }
    if (i.title === 'Yêu thích') {
      setCurType(1);
    }
  };

  const favoirite = async () => {
    await getFaSongs();
    let temp = faMu;
    let mxTemp = [];

    if (faMu !== '' && faMu !== null && faMu !== undefined) {
      for (let index = 0; index < faMu.length; index++) {
        mxTemp.push(faMu[index]?.id);
      }
    }

    if (faMu !== '' && faMu !== null && faMu !== undefined) {
      let x = 0;
      for (let i = 0; i < faMu.length; i++) {
        if (faMu[i]?.id === playing?.id) {
          x++;

          console.log('faMu: ', faMu[0]);
          console.log('playing: ', playing);

          const index = mxTemp.indexOf(playing?.id);
          console.log('indext: ', index);

          if (index > -1) {
            temp.splice(index, 1);
          }
        }
      }
      if (x === 0) {
        await temp.push(playing);
      }
    } else {
      temp = [];
      await temp.push(playing);
    }

    saveFavourite(temp);
    getFaSongs();
  };

  const checkFavourite = () => {
    if (faMu !== '' && faMu !== null && faMu !== undefined) {
      for (let i = 0; i < faMu.length; i++) {
        if (faMu[i]?.id === playing?.id) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <View style={{flex: 1, backgroundColor: settings.colors.mainColor}}>
      <View style={main.container}>
        <StatusBar
          backgroundColor={settings.colors.mainColor}
          barStyle="dark-content"
        />
        <TouchableOpacity
          onPress={() => {
            nav.openDrawer();
          }}
          style={main.menuButton}>
          <Ionicons name="menu" size={30} color={settings.colors.secondColor} />
        </TouchableOpacity>
        <Text style={[main.textAppName, {fontFamily: 'SVN-Olivier'}]}>
          Master MuSic
        </Text>
        <View style={{flex: 1}} />
        <TouchableOpacity style={main.searchButton}>
          <Ionicons
            name="search"
            size={26}
            color={settings.colors.secondColor}
          />
        </TouchableOpacity>
      </View>

      <View style={main.tabMenu}>
        <FlatList
          data={[{title: 'Tất cả'}, {title: 'Yêu thích'}]}
          horizontal
          renderItem={({item}) => (
            <RenderItemType item={item} now={type} onClick={clickType} />
          )}
          keyExtractor={item => {
            return item?.title;
          }}
          style={{flex: 1}}
        />
      </View>
      {songs !== '' ? (
        <FlatList
          data={curType === 0 ? songs : curType === 1 ? faMu : songs}
          renderItem={({item}) => (
            <RenderItem item={item} onClick={playMu} now={playing} />
          )}
          keyExtractor={item => {
            return item?.id;
          }}
          style={{flex: 1}}
        />
      ) : (
        <View style={{flex: 1}}></View>
      )}

      <Slider
        minimumValue={0}
        maximumValue={dur}
        minimumTrackTintColor={settings.colors.secondColor}
        thumbTintColor={settings.colors.secondColor}
        maximumTrackTintColor={settings.colors.secondColor}
        thumbImage={require('../app/assets/images/none.png')}
        value={cur}
        style={{
          marginBottom: -10,
          marginTop: -10,
          marginLeft: -16,
          marginRight: -16,
          zIndex: 99999,
          backgroundColor: 'rgba(0,0,0,0)',
        }}
      />
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={() => {
          setShowModal(true);
        }}
        activeOpacity={0.85}
        style={main.controlContainer}>
        <View style={main.control}>
          <View style={main.controlImage}>
            <Image
              resizeMode="contain"
              source={require('../app/assets/images/disk.png')}
              style={{width: 40, height: 40}}
            />
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text numberOfLines={1} style={{fontSize: 16}}>
              {playing?.title}
            </Text>
            <Text numberOfLines={1} style={{fontSize: 12}}>
              {playing?.artist}
            </Text>
          </View>

          <View style={main.controlButton}>
            <TouchableOpacity
              onPress={() => {
                favoirite();
              }}
              style={[
                modal.rightButton,
                {alignItems: 'flex-end', paddingRight: 5},
              ]}>
              {!checkFavourite() ? (
                <AntDesign name="heart" size={18} color={'#CFD8DC'} />
              ) : (
                <AntDesign
                  name="heart"
                  size={18}
                  color={settings.colors.secondColor}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                pauseSong();
              }}
              style={main.controlPlay}>
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
              style={main.controlNext}>
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
          <View style={modal.header}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}
              style={modal.leftButton}>
              <Ionicons
                name="ios-chevron-back-outline"
                size={24}
                color={settings.colors.secondColor}
              />
            </TouchableOpacity>
            <Text style={modal.title}>ĐANG PHÁT</Text>
            <TouchableOpacity
              onPress={() => {
                favoirite();
              }}
              style={modal.rightButton}>
              {!checkFavourite() ? (
                <AntDesign name="heart" size={18} color={'#CFD8DC'} />
              ) : (
                <AntDesign
                  name="heart"
                  size={18}
                  color={settings.colors.secondColor}
                />
              )}
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
