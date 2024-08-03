import { createSlice, configureStore, Dispatch, UnknownAction } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
import { tweetAPI } from '../../src/services/TweetAPI';
import { useSelector, useDispatch } from 'react-redux';
import { JWT, State } from '../../src/interfaces/user';
import { refreshToken } from '../api';
import { setJwtReducer, clearJwtReducer, setTweetsReducer } from './reducers';
import { JwtStorage } from 'src/utils/JwtStorage';
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const initialState: State = {
  value: {
    jwt: JwtStorage.getAccessToken(),
    history: null,
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
  },
});

const { setJwt, clearJwt, setTweets } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [tweetAPI.reducerPath]: tweetAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tweetAPI.middleware),
});

const useUserState = () => {
  const jwt = useSelector((state: ReturnType<typeof store.getState>) => state.user.value.jwt);
  // TODO: modularize this
  // and move it to a separate function
  const tweets = useSelector((state: ReturnType<typeof store.getState>) => state.user.value.tweets);
  const dispatch: Dispatch<UnknownAction> = useDispatch();

  const isLoggedIn = jwt !== null;

  // console.trace();

  axios.interceptors.request.use((config) => {
    function canUseAuthorizationHeader(jwt: JWT | null, config: AxiosRequestConfig): boolean {
      if (!jwt) return false;
      if (config.url?.endsWith('/api/refresh/')) return false;
      if (config.headers?.Authorization) return false;
      return true;
    }

    if (canUseAuthorizationHeader(jwt, config)) {
      config.headers.Authorization = `Bearer ${jwt?.token}`;
    }

    return config;
  }, undefined, { synchronous: true });


  axios.interceptors.response.use((response) => response, async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;
    const { url } = originalRequest;
    const { status } = error.response;
    let isRefreshing = false;

    function canRefreshToken(url: string, status: number, isRefreshing: boolean): boolean {
      if (status !== 401) return false;
      if (url.endsWith('/api/refresh/')) return false;
      if (isRefreshing) return false;
      return true;
    }

    if (canRefreshToken(url as string, status, isRefreshing)) {
      const accessToken: JWT = await refreshToken() as JWT;
      const headers = originalRequest.headers as AxiosRequestHeaders;
      headers.Authorization = `Bearer ${accessToken.token}`;
      isRefreshing = true;
      return axios.request(originalRequest);
    }

    return Promise.reject(error);
  });

  return {
    jwt,
    dispatch,
    isLoggedIn,
    tweets,
  };
};

export {
  initialState,
  userSlice,
  store,
  setJwt,
  clearJwt,
  setTweets,
  useUserState,
};
