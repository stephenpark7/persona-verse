import { createSlice, configureStore } from '@reduxjs/toolkit'
import React, { PropsWithChildren, useCallback } from 'react';
import { Provider } from 'react-redux';
import { JWT } from 'src/interfaces';
import API from '../api';
import { NavigateFunction } from 'react-router-dom';
import { JWTWrapper } from 'src/interfaces/user';
import { useSelector, useDispatch } from 'react-redux';

const jwt = createSlice({
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

export const { set, clear } = jwt.actions;

export const store = configureStore({
  reducer: {
    jwt: jwt.reducer,
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
  const storedJwt = useSelector((state: JWTWrapper) => state.jwt.user);
  const token = localStorage.getItem('token');
  const [ jwt, setJWT ] = React.useState<JWT>(storedJwt ?? JSON.parse(token as string));

  useCallback(() => {
    if (!storedJwt) {
      const token = localStorage.getItem('token');
      if (token) {
        const data = JSON.parse(token);
        store.dispatch(set(data));
        setJWT(data);
      }
    }
  }, [ storedJwt ]);

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

    const isPathRefreshable = (url: string, paths: string[]): boolean => {
      return !paths.some(path => url.endsWith(path));
    };

    if (url.includes('/api/') && isPathRefreshable(url, ignoredPaths)) {
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
              setJWT(data);
              config.headers = {
                ...config.headers,
                Authorization: `Bearer ${data.token}`,
              };
              const response = await originalFetch(resource, config);
              return response;
            } else {
              throw new Error;
            }
          }
          return response;
        }
        catch (error: unknown) {
          clearUserData(setJWT);
          throw new Error('Error refreshing token.');
        }
      }
    }
    return originalFetch(resource, config);
  };

  return {
    jwt,
    dispatch: useDispatch(),
    isLoggedIn: jwt !== null,
  };
};

export const clearUserData = (setJWT: React.Dispatch<React.SetStateAction<JWT>>) => {
  localStorage.removeItem('token');
  store.dispatch(clear());
  setJWT(null);
};

export async function logout(navigate: NavigateFunction) {
  await API.logout(navigate);
}

// export function userStore() {
//   // const localStorageJwt = localStorage.getItem('token') ?? null;
//   // const userData = store.getState().jwt.value ?? JSON.parse(localStorageJwt as string);
//   return {
//     userData: store.getState().jwt.user,
//     setUserData: (data: JWT) => store.dispatch(set(data)),
//     isLoggedIn: store.getState() !== null,
//     logout: logout,
//   };
// }

// store.subscribe(() => {
//   console.log(store.getState());
// });
