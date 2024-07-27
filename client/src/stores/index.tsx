import { createSlice, configureStore } from '@reduxjs/toolkit'
import React, { PropsWithChildren, useCallback, useState } from 'react';
import { Provider } from 'react-redux';
import { JWT } from 'src/interfaces';
import API from '../api';
import { JWTWrapper } from 'src/interfaces/user';
import { useSelector, useDispatch } from 'react-redux';

const jwtSlice = createSlice({
  name: 'jwt',
  initialState: {
    user: null,
  },
  reducers: {
    set: (state, action) => {
      state.user = action.payload;
    },
    clear: (state) => {
      state.user = null;
    },
  },
});

export const { set, clear } = jwtSlice.actions;

export const store = configureStore({
  reducer: {
    jwt: jwtSlice.reducer,
  },
});

export function UserStoreProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export const useJWT = () => {
  const jwt = useSelector((state: JWTWrapper) => state.jwt.user);
  const dispatch = useDispatch();

  const isLoggedIn = () => jwt !== null;

  // useCallback(() => {
  //   if (!jwt) {
  //     console.log('storedJwt is null');
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       const data = JSON.parse(token);
  //       store.dispatch(set(data));
  //       setJWT(data);
  //     }
  //   }
  // }, [ jwt ]);

  const { fetch: originalFetch } = window;

  window.fetch = async (...args): Promise<Response> => {
    const [ resource, config = {} ] = args;

    const url = resource.toString();

    const ignoredPaths = [
      '/api/users/signup',
      '/api/users/login',
      '/api/users/logout',
      '/api/refresh',
    ];

    const isPathRefreshable = (url: string) => !ignoredPaths.some(path => url.endsWith(path));

    if (url.includes('/api/') && isPathRefreshable(url)) {
      if (jwt) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${jwt.token}`,
        };
        try {
          const response = await originalFetch(resource, config);
          if (response.status === 401) {
            const data = await API.refreshToken();
            if (data) {
              store.dispatch(set(data));
              config.headers = {
                ...config.headers,
                Authorization: `Bearer ${data.token}`,
              };
              return await originalFetch(resource, config);
            } else {
              throw new Error('Error refreshing token.');
            }
          }
          return response;
        }
        catch (error: unknown) {
          clearUserData();
          throw new Error('Error refreshing token.');
        }
      }
    }
    return originalFetch(resource, config);
  };

  return {
    jwt,
    dispatch,
    isLoggedIn,
  };
};

export const clearUserData = () => {
  localStorage.removeItem('token');
  store.dispatch(clear());
};

store.subscribe(() => {
  console.log(store.getState());
});
