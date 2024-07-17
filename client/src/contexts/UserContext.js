import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useOnMountUnsafe, getLocalStorageToken } from '../utils';
import API from '../lib/api';

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const localStorageToken = getLocalStorageToken();
  const [ userData, setUserData ] = useState(localStorageToken);

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
  }, [ userData, setUserData, tokenIsExpired ]);

  // const isLoggedIn = useMemo(() => userData !== null && !tokenIsExpired, [ userData, setUserData, tokenIsExpired ]);
  
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
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
