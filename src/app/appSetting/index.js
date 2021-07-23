import AsyncStorage from '@react-native-async-storage/async-storage';

const saveCurrentSong = async song => {
  try {
    const jsonValue = JSON.stringify(song);
    await AsyncStorage.setItem('currentSong', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getCurrentSong = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('currentSong');
    console.log('getCurrentSong: ', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export {saveCurrentSong, getCurrentSong};
