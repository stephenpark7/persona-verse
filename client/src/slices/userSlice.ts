import { createSlice } from '@reduxjs/toolkit';
import { State } from '../interfaces/user';
import { setJwtReducer, clearJwtReducer, addTweetReducer, setTweetsReducer } from '../reducers';
import { JwtStorage } from '../utils/JwtStorage';

const initialState: State = {
  value: {
    jwt: JwtStorage.getAccessToken(),
    tweets: null,
  },
};

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

export const { setJwt, clearJwt, setTweets, addTweet } = userSlice.actions;
export { initialState, userSlice, userReducer };
