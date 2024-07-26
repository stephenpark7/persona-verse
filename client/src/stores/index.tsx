import { createSlice, configureStore } from '@reduxjs/toolkit'
import React, { PropsWithChildren, useCallback } from 'react';
import { Provider } from 'react-redux';
import { JWT } from 'src/interfaces';
import API from '../api';
import { NavigateFunction } from 'react-router-dom';
import { JWTWrapper } from 'src/interfaces/user';
import { useSelector, useDispatch } from 'react-redux';

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

  return { 
    jwt,
    dispatch: useDispatch(),
  };
};

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

export function UserStoreProvider({ children } : PropsWithChildren) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export async function logout(navigate: NavigateFunction) {
  await API.logout(navigate);
}

export async function clearUserData() {
  store.dispatch(clear());
};

export function userStore() {
  // const localStorageJwt = localStorage.getItem('token') ?? null;
  // const userData = store.getState().jwt.value ?? JSON.parse(localStorageJwt as string);
  return {
    userData: store.getState().jwt.user,
    setUserData: (data: JWT) => store.dispatch(set(data)),
    isLoggedIn: store.getState() !== null,
    logout: logout,
  };
}

store.subscribe(() => {
  console.log(store.getState());
});
