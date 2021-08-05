import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// save user data to AsyncStorage
export const saveUser = async data => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

// get user data form AsyncStorage
export const getUser = async () => {
  try {
    const res = await AsyncStorage.getItem('user');
    return res != null ? JSON.parse(res) : null;
  } catch (error) {
    console.log(error);
  }
};

// delete user data form AsyncStorage
export const deleteUser = async () => {
  try {
    await AsyncStorage.multiRemove(['user', 'accessToken']);
  } catch (error) {
    console.log(error);
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isActivated: false,
    isSetup: false,
    current: {},
    settings: {},
  },
  reducers: {
    activate: (state, action) => {
      state.isActivated = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.current = action.payload;
    },
    setup: (state, action) => {
      state.isSetup = action.payload;
    },
  },
});

export const {activate, setCurrentUser, setup} = userSlice.actions;
export default userSlice.reducer;
