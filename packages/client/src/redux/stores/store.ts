import { combineReducers } from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { state, State } from '@schemas';
import { tokenStorage } from '@utils';
import {
  setJwtReducer,
  clearJwtReducer,
  addTweetReducer,
  setTweetsReducer,
} from '../reducers';
import { tweetAPI } from '../services';
import { useDispatch } from 'react-redux';
import { setDocTitleReducer } from '../reducers/docTitleReducers';

export const initialState: State = {
  value: {
    jwt: tokenStorage.getAccessToken(),
    tweets: null,
    docTitle: 'PersonaVerse - Home',
  },
};

state.parse(initialState);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setJwt: setJwtReducer,
    clearJwt: clearJwtReducer,
    setTweets: setTweetsReducer,
    addTweet: addTweetReducer,
    setDocTitle: setDocTitleReducer,
  },
});

export const browserSlice = createSlice({
  name: 'browser',
  initialState: initialState,
  reducers: {
    setDocTitle: setDocTitleReducer,
  },
});

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  tweetAPI: tweetAPI.reducer,
  doctTitle: browserSlice.reducer,
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

export type AppDispatch = AppStore['dispatch'];

export const useAppStoreDispatch = useDispatch<AppDispatch>;

export const store = setupStore();
