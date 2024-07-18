import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { useOnMountUnsafe, getLocalStorageToken } from '../utils';
import API from '../lib/api';
import { UserData, UserContext as UserContextInterface } from '../interfaces';

export const UserContext = createContext<UserContextInterface>({
  userData: null,
  setUserData: () => {},
  isLoggedIn: false,
  logout: async () => {},
});

export function UserContextProvider({ children } : PropsWithChildren) {
  const localStorageToken = getLocalStorageToken();
  const [ userData, setUserData ] = useState<UserData>(localStorageToken);
  console.log(userData);

  const tokenIsExpired = useMemo(() => {
    if (!userData) {
      return true;
    }
    const dateNow = Date.now();
    const expiresAt = parseInt(userData.expiresAt) * 1000;
    return dateNow >= expiresAt;
  }, [ userData ]);

  const isLoggedIn = userData !== null && !tokenIsExpired;

  useOnMountUnsafe(() => {
    async function refresh() {
      if (userData !== null && tokenIsExpired) {
        API.refreshToken(setUserData);
      }
    }
    refresh();
  });

  const logout = useCallback(async () => {
    if (await API.logout()) {
      localStorage.removeItem('token');
      setUserData(null);
    }
  }, [ setUserData ]);

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
