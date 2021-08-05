import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Animated,
  Easing,
  BackHandler,
  StatusBar,
} from 'react-native';
import {main, modal} from './css';
import MusicFiles, {Constants} from 'react-native-get-music-files-v3dev-test';
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
import SplashScreen from 'react-native-splash-screen';
import Video from 'react-native-video';

// redux
import {useSelector} from 'react-redux';

let spinValue = new Animated.Value(0);

export const HomeScreen = () => {
  SplashScreen.hide();

  const mainColor = useSelector(state => state.theme.mainColor);
  const secColor = useSelector(state => state.theme.secColor);
  const isDark = useSelector(state => state.theme.isDarkMode);

  console.log(
    ' Home -------- mainColor: ',
    mainColor,
    ' - ',
    'secColor: ',
    secColor,
    ' - ',
    'darkMode: ',
    isDark,
  );

  const nav = useNavigation();
  const sortBy = Constants.SortBy.Title;
  const sortOrder = Constants.SortOrder.Ascending;

  const [songs, setSongs] = useState('');
  const [songIDs, setSongIDs] = useState('');
  const [playing, setPlaying] = useState('');
  const [isPause, setIsPause] = useState(true);

  const [isPlay, setIsPlay] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [dur, setDur] = useState(0);
  const [cur, setCur] = useState(0);

  const [type, setType] = useState('Tất cả');
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
    setShowModal(true);
    setPlaying(data);
    setIsPause(false);
    setIsPlay(true);
    saveCurrentSong(data);
  };

  const nextSong = () => {
    if (type === 'Tất cả') {
      const currentSong = songIDs.indexOf(playing?.id);
      if (currentSong < songs.length) {
        playMu(songs[currentSong + 1]);
      } else {
        playMu(songs[0]);
      }
    } else {
      let faID = [];
      for (let index = 0; index < faMu.length; index++) {
        faID.push(faMu[i]?.id);
      }
      const currentSong = faID.indexOf(playing?.id);
      if (currentSong < faMu.length) {
        playMu(faMu[currentSong + 1]);
      } else {
        playMu(faMu[0]);
      }
    }
  };

  const reSong = () => {
    const currentSong = songIDs.indexOf(playing?.id);
    playMu(songs[currentSong - 1]);
  };

  const pauseSong = () => {
    if (playing !== '' && playing !== null && playing !== undefined) {
      setIsPause(!isPause);
    } else {
      //
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
        savePlaylist(tracks.results);
        setSongs(tracks.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const clickType = i => {
    setType(i.title);
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

  useEffect(() => {
    const backAction = () => {
      if (showModal) {
        setShowModal(false);
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction(),
    );
    return () => backHandler.remove();
  }, [BackHandler]);

  // source={require('../app/assets/mu/mu01.mp3')}
  // /storage/emulated/0/Musics/ai_mang_co_don_di_k_icm_ft_apj_dimz_cover_ban_full_tiktok_6576209435847683983.mp3

  return (
    <View style={{flex: 1, backgroundColor: mainColor, paddingTop: 25}}>
      {isPlay !== false && playing !== '' && (
        <Video
          source={{
            uri: playing?.path,
          }}
          audioOnly={true}
          paused={isPause}
          playInBackground={true}
          onEnd={() => {
            nextSong();
          }}
          onProgress={e => {
            setDur(parseInt(e.seekableDuration));
            setCur(parseInt(e.currentTime));
          }}
          style={{flex: 0, zIndex: -99}}
        />
      )}
      <View
        style={[
          main.container,
          {
            backgroundColor: mainColor,
            borderColor: secColor === '#000' ? '#ECEFF1' : '#424242',
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            nav.openDrawer();
          }}
          style={[main.menuButton]}>
          <Ionicons name="menu" size={30} color={secColor} />
        </TouchableOpacity>
        <Text
          onPress={() => {
            nav.openDrawer();
          }}
          style={[
            main.textAppName,
            {fontFamily: 'SVN-Bariol', color: secColor},
          ]}>
          Master MuSic
        </Text>
        <View style={{flex: 1}} />
        <TouchableOpacity style={main.searchButton}>
          <Ionicons name="search" size={26} color={secColor} />
        </TouchableOpacity>
      </View>

      <View
        style={[
          main.tabMenu,
          {
            backgroundColor: mainColor,
            borderColor: secColor === '#000' ? '#ECEFF1' : '#424242',
          },
        ]}>
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
          data={type === 'Tất cả' ? songs : type === 'Yêu thích' ? faMu : songs}
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
        minimumTrackTintColor={secColor}
        thumbTintColor={secColor}
        maximumTrackTintColor={secColor}
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
        style={[
          main.controlContainer,
          {
            backgroundColor: mainColor,
            borderColor: secColor === '#000' ? '#ECEFF1' : '#424242',
          },
        ]}>
        <View style={main.control}>
          <View style={main.controlImage}>
            <Animated.View style={{transform: [{rotate: spin}]}}>
              {secColor === '#000' ? (
                <Image
                  resizeMode="contain"
                  source={require('../app/assets/images/disk.png')}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={require('../app/assets/images/disk-2.png')}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              )}
            </Animated.View>
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text numberOfLines={1} style={{fontSize: 16, color: secColor}}>
              {playing?.title}
            </Text>
            <Text numberOfLines={1} style={{fontSize: 12, color: secColor}}>
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
                <AntDesign name="heart" size={18} color={secColor} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                pauseSong();
              }}
              style={main.controlPlay}>
              {isPause ? (
                <FontAwesome5 name="play" size={16} color={secColor} />
              ) : (
                <FontAwesome5 name="pause" size={16} color={secColor} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                nextSong();
              }}
              style={main.controlNext}>
              <Ionicons name="play-skip-forward" size={22} color={secColor} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide">
        <View style={{flex: 1, backgroundColor: mainColor}}>
          <View style={modal.header}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}
              style={modal.leftButton}>
              <Ionicons
                name="ios-chevron-back-outline"
                size={24}
                color={secColor}
              />
            </TouchableOpacity>
            <Text
              style={[
                modal.title,
                {
                  color: secColor,
                },
              ]}>
              ĐANG PHÁT
            </Text>
            <TouchableOpacity
              onPress={() => {
                favoirite();
              }}
              style={modal.rightButton}>
              {!checkFavourite() ? (
                <AntDesign name="heart" size={18} color={'#CFD8DC'} />
              ) : (
                <AntDesign name="heart" size={18} color={secColor} />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Animated.View style={{transform: [{rotate: spin}]}}>
              {secColor === '#000' ? (
                <Image
                  resizeMode="contain"
                  source={require('../app/assets/images/disk.png')}
                  style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1.2,
                  }}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={require('../app/assets/images/disk-2.png')}
                  style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1.2,
                  }}
                />
              )}
            </Animated.View>
          </View>

          <View
            style={{height: 50, paddingHorizontal: 20, paddingHorizontal: 30}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                color: secColor,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {playing?.title}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 12,
                color: secColor,
                textAlign: 'center',
              }}>
              {playing?.artist}
            </Text>
          </View>

          <View style={{height: 50, paddingHorizontal: 20}}>
            <Slider
              minimumValue={0}
              maximumValue={dur}
              minimumTrackTintColor={secColor}
              thumbTintColor={secColor}
              maximumTrackTintColor={secColor}
              value={cur}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <Text style={{color: secColor}}>
                {parseInt(cur) === 0 ? '00:00' : toHHMMSS(cur)}
              </Text>
              <View style={{flex: 1}} />
              <Text style={{color: secColor}}>
                {parseInt(dur) === 0 ? '00:00' : toHHMMSS(dur)}
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
                  backgroundColor: secColor,

                  shadowColor: secColor,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}>
                <Ionicons name="play-skip-back" size={18} color={mainColor} />
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
                  backgroundColor: secColor,

                  shadowColor: secColor,
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
                    color={mainColor}
                    style={{marginLeft: 3}}
                  />
                ) : (
                  <FontAwesome5 name="pause" size={18} color={mainColor} />
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
                  backgroundColor: secColor,

                  shadowColor: secColor,
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
                  color={mainColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
