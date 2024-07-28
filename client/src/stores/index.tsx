import { createSlice, configureStore, Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { JWT, State, StateProperties } from '../../src/interfaces/user';
import { refreshToken } from '../api';
import { useOnMountUnsafe } from '../../src/hooks';
import { setLocalStorageToken } from '../../src/utils';
import { setJwtReducer, clearJwtReducer } from './reducers';

const initialState: State = {
  value: {
    jwt: null,
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
  const userState: StateProperties = useSelector((state: ReturnType<typeof store.getState>) => state.user.value);
  const dispatch: Dispatch<UnknownAction> = useDispatch();

  const isLoggedIn = userState.jwt !== null;

  useOnMountUnsafe(() => setLocalStorageToken(userState));

  // TODO: modularize this
  window.fetch = new Proxy(window.fetch, {
    apply: async (originalFetch, that, args) => {
      if (!userState.jwt) return Reflect.apply(originalFetch, that, args);

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

      // console.log(originalFetch, that, args);

        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${userState.jwt.token}`,
        };

        try {
          let response = await Reflect.apply(originalFetch, that, [ resource, config ]);
          if (response.status === 401) {
            const data: JWT = await refreshToken() as JWT;
            if (data) {
              dispatch(setJwt(data));
              config.headers = {
                ...config.headers,
                Authorization: `Bearer ${data.token}`,
              };
              response = await Reflect.apply(originalFetch, that, [ resource, config ]);
            } else {
              throw new Error('Failed to refresh token.');
            }
          }
          return response;
        } catch (error) {
          // dispatch(clearJwt());
          // clearUserData();
          throw new Error('Error refreshing token.');
        }
      }

      return Reflect.apply(originalFetch, that, args);
    },
  });

  return {
    userState,
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
