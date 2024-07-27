import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux';
import { JWT, State, User } from 'src/interfaces/user';
import API from '../api';
import { useOnMountUnsafe } from '../../src/hooks';
// import { JWTWrapper, JWT } from '../../src/interfaces/user';

// const setReducer: CaseReducer<JWTWrapper, PayloadAction<JWTWrapper>> = (state, action) => {
//   state = action.payload;
// };

// const clearReducer: CaseReducer<JWTWrapper, PayloadAction<JWTWrapper>> = (state, action) => {
//   state.jwt.user = null;
// };

const initialState: User = {
  value: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    set: (state, action: PayloadAction<State>): void => {
      state.value = action.payload;
    },
    clear: (state): void => {
      state.value = null;
    },
  },
});

export const { set, clear } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});


export const clearUserData = () => {
  localStorage.removeItem('token');
  const dispatch = useDispatch();
  dispatch(clear());
};

export const useUserState = () => {
  const userState = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const isLoggedIn = !!(userState);

  useOnMountUnsafe(function setLocalStorageToken() {
    if (!userState) {
      const token =  localStorage.getItem('jwt');
      if (token) {
        const data: State = JSON.parse(token);
        dispatch(set(data));
      }
    }
  });

  window.fetch = new Proxy(window.fetch, {
    apply: async (originalFetch, that, args) => {
      if (!userState) return Reflect.apply(originalFetch, that, args);

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
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${userState.jwt.token}`,
        };

        try {
          let response = await Reflect.apply(originalFetch, that, [ resource, config ]);
          if (response.status === 401) {
            const data: JWT = await API.refreshToken() as JWT;
            if (data) {
              dispatch(set({ jwt: data }));
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
          clearUserData();
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
    clearUserData,
  };
};

store.subscribe(() => {
  console.log(store.getState());
});
