import { createSlice, configureStore } from '@reduxjs/toolkit'
import React, { PropsWithChildren, useEffect} from 'react';
import { Provider } from 'react-redux';
import API from '../api';
import { JWTWrapper } from 'src/interfaces/user';
import { useSelector, useDispatch } from 'react-redux';
import { useOnMountUnsafe } from 'src/hooks';
import { isTokenRefreshablePath } from 'src/utils';

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

  useOnMountUnsafe(() => {
    if (!jwt) {
      const token = localStorage.getItem('token');
      if (token) {
        const data = JSON.parse(token);
        dispatch(set(data));
      }
    }
  });

  window.fetch = new Proxy(window.fetch, {
    apply: async (originalFetch, that, args) => {
      if (!jwt) return Reflect.apply(originalFetch, that, args);

      const [resource, config = {}] = args;
      const url = resource.toString();

      const ignoredPaths = [
        '/api/users/signup',
        '/api/users/login',
        '/api/users/logout',
        '/api/refresh',
      ];

      const isPathRefreshable = (url: string) => !ignoredPaths.some(path => url.endsWith(path));

      if (url.includes('/api/') && isPathRefreshable(url)) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${jwt.token}`,
        };

        try {
          let response = await Reflect.apply(originalFetch, that, [resource, config]);
          if (response.status === 401) {
            const data = await API.refreshToken();
            if (data) {
              dispatch(set(data));
              config.headers = {
                ...config.headers,
                Authorization: `Bearer ${data.token}`,
              };
              response = await Reflect.apply(originalFetch, that, [resource, config]);
            } else {
              throw new Error('Failed to refresh token.');
            }
          }
          return response;
        } catch (error) {
          clearUserData();
          throw new Error('Error refreshing token.');
        }
      }

      return Reflect.apply(originalFetch, that, args);
    },
  });

  return {
    jwt,
    dispatch,
    isLoggedIn,
    clearUserData,
  };
};

export const clearUserData = () => {
  localStorage.removeItem('token');
  store.dispatch(clear());
};

// store.subscribe(() => {
//   console.log(store.getState());
// });
