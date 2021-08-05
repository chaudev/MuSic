import {combineReducers} from '@reduxjs/toolkit';
import {userSlice, themeSlice} from './reducers';

const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
});

export default rootReducer;
