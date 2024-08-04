export * from './store';
export * from '../slices/userSlice';
export * from '../hooks/useUserState';
export * from '../interceptors/axiosInterceptors';

// import { createSlice, configureStore } from '@reduxjs/toolkit';
// import { tweetAPI } from '../services/TweetAPI';
// import { useSelector } from 'react-redux';
// import { JWT, State } from '../interfaces/user';
// import { refreshToken } from '../api';
// import { setJwtReducer, clearJwtReducer, addTweetReducer, setTweetsReducer } from '../reducers';
// import { JwtStorage } from '../utils/JwtStorage';
// import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
// import { setupListeners } from '@reduxjs/toolkit/query';

// const initialState: State = {
//   value: {
//     jwt: JwtStorage.getAccessToken(),
//     tweets: null,
//   },
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState: initialState,
//   reducers: {
//     setJwt: setJwtReducer,
//     clearJwt: clearJwtReducer,
//     setTweets: setTweetsReducer,
//     addTweet: addTweetReducer,
//   },
// });

// const { setJwt, clearJwt, setTweets, addTweet } = userSlice.actions;

// const store = configureStore({
//   reducer: {
//     user: userSlice.reducer,
//     tweetAPI: tweetAPI.reducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tweetAPI.middleware),
// });

// const useUserState = () => {
//   const jwt = useSelector((state: ReturnType<typeof store.getState>) => state.user.value.jwt);
//   // TODO: modularize this
//   // and move it to a separate function
//   const tweets = useSelector((state: ReturnType<typeof store.getState>) => state.user.value.tweets);
//   // const dispatch: Dispatch<UnknownAction> = useDispatch();

//   const isLoggedIn = jwt !== null;

//   // console.trace();

//   axios.interceptors.request.use((config) => {
//     function canUseAuthorizationHeader(jwt: JWT | null, config: AxiosRequestConfig): boolean {
//       if (!jwt) return false;
//       if (config.url?.endsWith('/api/refresh/')) return false;
//       if (config.headers?.Authorization) return false;
//       return true;
//     }

//     if (canUseAuthorizationHeader(jwt, config)) {
//       config.headers.Authorization = `Bearer ${jwt?.token}`;
//     }

//     return config;
//   }, undefined, { synchronous: true });


//   axios.interceptors.response.use((response) => response, async (error) => {
//     const originalRequest: AxiosRequestConfig = error.config;
//     const { url } = originalRequest;
//     const { status } = error.response;
//     let isRefreshing = false;

//     function canRefreshToken(url: string, status: number, isRefreshing: boolean): boolean {
//       if (status !== 401) return false;
//       if (url.endsWith('/api/refresh/')) return false;
//       if (isRefreshing) return false;
//       return true;
//     }

//     if (canRefreshToken(url as string, status, isRefreshing)) {
//       const accessToken: JWT = await refreshToken() as JWT;
//       const headers = originalRequest.headers as AxiosRequestHeaders;
//       headers.Authorization = `Bearer ${accessToken.token}`;
//       isRefreshing = true;
//       return axios.request(originalRequest);
//     }

//     return Promise.reject(error);
//   });

//   return {
//     jwt,
//     // dispatch: isLoggedIn ? dispatch : null,
//     isLoggedIn,
//     tweets,
//   };
// };

// setupListeners(store.dispatch);

// export {
//   initialState,
//   userSlice,
//   store,
//   setJwt,
//   clearJwt,
//   setTweets,
//   addTweet,
//   useUserState,
// };
