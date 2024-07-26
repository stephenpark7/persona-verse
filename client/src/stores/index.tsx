import { createSlice, configureStore } from '@reduxjs/toolkit'
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { JWT } from 'src/interfaces';
import API from '../api';
import { NavigateFunction } from 'react-router-dom';
import { JWTWrapper } from 'src/interfaces/user';
import { useSelector, useDispatch } from 'react-redux';

export const useJWT = () => {
  let jwt = useSelector((state: JWTWrapper) => state.jwt.value);
  if (!jwt) {
    const localStorageToken = localStorage.getItem('token');
    if (localStorageToken) jwt = JSON.parse(localStorageToken);
    if (jwt) store.dispatch(set(jwt));
  }
  const dispatch = useDispatch();
  return { 
    jwt,
    dispatch,
  };
};

const initialState: JWT = null;

const jwt = createSlice({
  name: 'jwt',
  initialState: {
    value: initialState,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    clear: (state) => {
      state.value = initialState;      
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
    userData: store.getState().jwt.value,
    setUserData: (data: JWT) => store.dispatch(set(data)),
    isLoggedIn: store.getState() !== null,
    logout: logout,
  };
}

store.subscribe(() => {
  console.log(store.getState());
});
