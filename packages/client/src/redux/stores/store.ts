import { useDispatch } from 'react-redux';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { Reducer, reducer } from '@schemas';
import { tokenStorage } from '@utils';
import * as reducers from '../reducers';
import { tweetAPI } from '../services';

export const initialState: Reducer = {
  user: {
    value: {
      jwt: tokenStorage.getAccessToken(),
      tweets: null,
      profile: null,
    },
  },
  browser: {
    value: {
      docTitle: 'PersonaVerse',
    },
  },
};

reducer.parse(initialState);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    setJwt: reducers.setJwtReducer,
    clearJwt: reducers.clearJwtReducer,
    setTweets: reducers.setTweetsReducer,
    addTweet: reducers.addTweetReducer,
    setProfile: reducers.setProfileReducer,
  },
});

export const { setJwt, clearJwt, setTweets, addTweet, setProfile } =
  userSlice.actions;

export const browserSlice = createSlice({
  name: 'browser',
  initialState: initialState.browser,
  reducers: {
    setDocTitle: reducers.setDocTitleReducer,
  },
});

export const { setDocTitle } = browserSlice.actions;

const rootReducer = combineReducers({
  user: userSlice.reducer,
  browser: browserSlice.reducer,
  tweetAPI: tweetAPI.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tweetAPI.middleware),
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;

export const useAppStoreDispatch = useDispatch<AppStore['dispatch']>;

export const store = setupStore();
