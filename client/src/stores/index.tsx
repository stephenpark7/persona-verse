import { createSlice, configureStore, Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { JWT, State } from '../../src/interfaces/user';
import { refreshToken } from '../api';
import { useOnMountUnsafe } from '../../src/hooks';
import { setJwtReducer, clearJwtReducer } from './reducers';
import { useEffect } from 'react';
import { JwtStorage } from 'src/utils/JwtStorage';
import axios, { AxiosRequestHeaders } from 'axios';
import { isTokenRefreshablePath } from 'src/utils';

const initialState: State = {
  value: {
    jwt: JwtStorage.getAccessToken(),
    history: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setJwt: setJwtReducer,
    clearJwt: clearJwtReducer,
  },
});

const { setJwt, clearJwt } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

const useUserState = () => {
  const jwt = useSelector((state: ReturnType<typeof store.getState>) => state.user.value.jwt);
  const dispatch: Dispatch<UnknownAction> = useDispatch();

  const isLoggedIn = jwt !== null;

  axios.interceptors.request.use((config) => {
    if (jwt === null) {
      return config;
    }

    if (config.baseURL?.endsWith('/api/refresh/')) {
      // config.withCredentials = true;
      return config;
    }

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${jwt.token}`,
    } as AxiosRequestHeaders;

    return config;
  }, undefined, { synchronous: true });

  axios.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    if (error.response.status === 401 &&
      isTokenRefreshablePath(error.config.baseURL)) {
        console.log(error.config.baseURL);
      const data: JWT = await refreshToken() as JWT;
      if (data) {
        dispatch(setJwt(data));
        error.config = {
          ...error.config,
          withCredentials: true,
          headers: {
            ...error.config.headers,
            Authorization: null,
          },
        };
        console.log(error.config);
        return axios.request(error.config);
      } else {
        dispatch(clearJwt());
        throw new Error('Failed to refresh token.');
      }
    }
    return Promise.reject(error);
  });

  // console.log(jwt, isLoggedIn);
  // console.log backtrace
  // console.trace();

  // if (JwtStorage.getAccessToken() === null) {
  //   useOnMountUnsafe(() => JwtStorage.setAccessToken(jwt));
  // }

  // const originalFetch = window.fetch;

  // useEffect(() => {
  //   // This needs to be executed after userState is set
  //   // so that the token is available with the latest value
  //   // maybe use something like debounce to wait for the value to be set
  //   // const controller = new AbortController();
  //   // const signal = controller.signal;
  //   async function fetchIntercept(jwt: JWT) {
  //     console.log('fetchIntercept', jwt);
  //     window.fetch = new Proxy(window.fetch, {
  //       apply: async (originalFetch, that, args) => {
  //         console.log('fetching', jwt);
  //         if (jwt === null) {
  //           console.log('fetching0', jwt);
  //           return Reflect.apply(originalFetch, that, args);
  //         }
  //         console.log('fetching0.1', jwt);

  //         const [ resource, config = {} ] = args;
  //         const url = resource.toString();

  //         const ignoredPaths = [
  //           '/api/users/signup',
  //           '/api/users/login',
  //           '/api/users/logout',
  //           '/api/refresh',
  //         ];

  //         const isPathRefreshable = (url: string) => !ignoredPaths.some(path => url.endsWith(path));

  //         if (url.includes('/api/') && isPathRefreshable(url)) {
  //           console.log('fetching1', jwt.token);
  //           config.headers = {
  //             ...config.headers,
  //             Authorization: `Bearer ${jwt.token}`,
  //           };
  //           try {
  //             let response = await Reflect.apply(originalFetch, that, [ resource, config ]);
  //             console.log('fetching2', response, jwt.token);
  //             if (response.status === 401) {
  //             console.log('fetching3', jwt.token);
  //               const data: JWT = await refreshToken() as JWT;
  //               if (data) {
  //                 dispatch(setJwt(data));
  //                 config.headers = {
  //                   ...config.headers,
  //                   Authorization: `Bearer ${data.token}`,
  //                 };
  //                 console.log('fetching4', data.token);
  //                 response = await Reflect.apply(originalFetch, that, [ resource, config ]);
  //               } else {
  //                 throw new Error('Failed to refresh token.');
  //               }
  //             }
  //             return response;
  //           } catch (error) {
  //             dispatch(clearJwt());
  //             throw new Error('Error refreshing token.');
  //           }
  //         }

  //         return Reflect.apply(originalFetch, that, args);
  //       },
  //     });
  //   };
  //   fetchIntercept(jwt);
  // }, [ jwt ]);

  // console.log(originalFetch == window.fetch);

  return {
    jwt,
    dispatch,
    isLoggedIn,
  };
};

// store.subscribe(() => {
//   console.log(store.getState());
// });

export {
  initialState,
  userSlice,
  store,
  setJwt,
  clearJwt,
  useUserState,
};
