import AsyncStorage from '@react-native-async-storage/async-storage';

// Save current song to cache
const saveCurrentSong = async song => {
  try {
    const jsonValue = JSON.stringify(song);
    await AsyncStorage.setItem('currentSong', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

// Get current song from cache
const getCurrentSong = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('currentSong');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

// Save playlist to cache
const savePlaylist = async songs => {
  try {
    const jsonValue = JSON.stringify(songs);
    await AsyncStorage.setItem('PlayList', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

// Get playlist from cache
const getPlaylist = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('PlayList');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

// Save playlist to cache
const saveFavourite = async songs => {
  try {
    const jsonValue = JSON.stringify(songs);
    await AsyncStorage.setItem('Favourite', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

// Get playlist from cache
const getFavourite = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('Favourite');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

// Save playlist to cache
const saveTheme = async theme => {
  try {
    const jsonValue = JSON.stringify(theme);
    await AsyncStorage.setItem('Theme', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

// Get playlist from cache
const getTheme = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('Theme');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

// Save darkmode to cache
const saveDarkmode = async theme => {
  try {
    const jsonValue = JSON.stringify(theme);
    await AsyncStorage.setItem('dark', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

// Get darkmode from cache
const getDarkmode = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('dark');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

// Export function
export {
  saveCurrentSong,
  getCurrentSong,
  savePlaylist,
  getPlaylist,
  saveFavourite,
  getFavourite,
  saveTheme,
  getTheme,
  saveDarkmode,
  getDarkmode,
};
