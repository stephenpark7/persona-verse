import { configureStore, createSlice } from '@reduxjs/toolkit';
import { State } from '@interfaces';
import { tokenStorage } from '@utils';
import { setJwtReducer, clearJwtReducer, addTweetReducer, setTweetsReducer } from '../reducers';
import { tweetAPI } from '../services';

export const initialState: State = {
  value: {
    jwt: tokenStorage.getAccessToken(),
    tweets: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setJwt: setJwtReducer,
    clearJwt: clearJwtReducer,
    setTweets: setTweetsReducer,
    addTweet: addTweetReducer,
  },
});

const rootReducer = {
  user: userSlice.reducer,
};

export const store = configureStore({
  reducer: {
    ...rootReducer,
    tweetAPI: tweetAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tweetAPI.middleware),
});
