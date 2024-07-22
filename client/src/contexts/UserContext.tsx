import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { getLocalStorageToken } from '../utils';
import { useOnMountUnsafe } from '../hooks';
import API from '../api';
import { UserData, UserContext as UserContextInterface } from '../interfaces';
import { NavigateFunction } from 'react-router-dom';

export const UserContext = createContext<UserContextInterface>({
  userData: null,
  setUserData: () => {},
  isLoggedIn: false,
  logout: async () => {},
});

export function UserContextProvider({ children } : PropsWithChildren) {
  const localStorageToken = getLocalStorageToken();
  const [ userData, setUserData ] = useState<UserData>(localStorageToken);

  const tokenIsExpired = function() {
    if (!userData) {
      return true;
    }
    const dateNow = Date.now();
    const expiresAt = parseInt(userData.expiresAt) * 1000;
    return dateNow >= expiresAt;
  }();

  async function logout(navigate: NavigateFunction) {
    await API.logout(setUserData, navigate);
  }

  useOnMountUnsafe(async () => {
    async function refresh() {
      if (userData !== null && tokenIsExpired) {
        API.refreshToken(setUserData);
      }
    }
    refresh();
  });

  const isLoggedIn = userData !== null && !tokenIsExpired;

  const contextValue = useMemo(() => ({
    userData,
    setUserData,
    isLoggedIn,
    logout,
  }), [ userData, isLoggedIn, logout ]);

  return (
    <UserContext.Provider value={contextValue as UserContextInterface}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
