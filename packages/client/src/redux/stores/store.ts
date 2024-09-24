import { combineReducers } from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Reducer, reducer } from '@schemas';
import { tokenStorage } from '@utils';
import {
  setJwtReducer,
  clearJwtReducer,
  addTweetReducer,
  setTweetsReducer,
  setProfileReducer,
} from '../reducers';
import { tweetAPI } from '../services';
import { useDispatch } from 'react-redux';
import { setDocTitleReducer } from '../reducers/docTitleReducers';
import { routes } from '@pages';

// TODO: create reducer for profile

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
      docTitle: routes[routes.length - 1].title,
    },
  },
};

reducer.parse(initialState);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    setJwt: setJwtReducer,
    clearJwt: clearJwtReducer,
    setTweets: setTweetsReducer,
    addTweet: addTweetReducer,
    setProfile: setProfileReducer,
  },
});

export const browserSlice = createSlice({
  name: 'browser',
  initialState: initialState.browser,
  reducers: {
    setDocTitle: setDocTitleReducer,
  },
});

const rootReducer = combineReducers({
  user: userSlice.reducer,
  tweetAPI: tweetAPI.reducer,
  browser: browserSlice.reducer,
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
