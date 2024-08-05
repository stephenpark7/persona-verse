import { createSlice } from '@reduxjs/toolkit';
import { setJwtReducer, clearJwtReducer, addTweetReducer, setTweetsReducer } from '../reducers';
import { initialState } from './initialState';

 const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setJwt: setJwtReducer,
    clearJwt: clearJwtReducer,
    setTweets: setTweetsReducer,
    addTweet: addTweetReducer,
  },
});

const userReducer = userSlice.reducer;

export { userSlice, userReducer };
