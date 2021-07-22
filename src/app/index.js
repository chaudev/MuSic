import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import MusicFiles, {
  Constants,
  CoverImage,
} from 'react-native-get-music-files-v3dev-test';
import {RenderItem} from './itemSong';

var Sound = require('react-native-sound');

// Enable playback in silence mode
Sound.setCategory('Playback');

var whoosh = undefined;

export const HomeScreen = () => {
  const sortBy = Constants.SortBy.Title;
  const sortOrder = Constants.SortOrder.Ascending;

  const [songs, setSongs] = useState('');
  const [playing, setPlaying] = useState('');
  const [isPause, setIsPause] = useState(false);

  useEffect(() => {
    getAllSongs();
  }, []);

  const playMu = data => {
    setPlaying(data);

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
    });
  };

  const nextSong = () => {
    const currentSong = songs.indexOf(playing);
    playMu(songs[currentSong + 1]);
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
        console.log(tracks);
        setSongs(tracks.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: 60, backgroundColor: 'grey'}}></View>
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

      <View
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
                backgroundColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 5,
              }}>
              <Text style={{color: '#fff'}}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                nextSong();
              }}
              style={{
                width: 40,
                height: 50,
                backgroundColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
