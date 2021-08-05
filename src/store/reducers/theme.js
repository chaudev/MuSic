import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// save theme data to AsyncStorage
export const saveTheme = async data => {
  try {
    await AsyncStorage.setItem('theme', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

// get theme data form AsyncStorage
export const getTheme = async () => {
  try {
    const res = await AsyncStorage.getItem('theme');
    return res != null ? JSON.parse(res) : null;
  } catch (error) {
    console.log(error);
  }
};

// delete theme data form AsyncStorage
export const deleteTheme = async () => {
  try {
    await AsyncStorage.multiRemove(['theme']);
  } catch (error) {
    console.log(error);
  }
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mainColor: '#fff',
    secColor: '#000',
    isDarkMode: false,
  },
  reducers: {
    setDarkMode: (state, action) => {
      console.log('setDarkMode: ', action.payload);
      state.isDarkMode = action.payload;
    },
    setMainColor: (state, action) => {
      state.mainColor = action.payload;
    },
    setSecColor: (state, action) => {
      state.secColor = action.payload;
    },
  },
});

export const {setDarkMode, setMainColor, setSecColor} = themeSlice.actions;
export default themeSlice.reducer;
