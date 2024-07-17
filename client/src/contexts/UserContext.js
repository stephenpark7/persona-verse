import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useOnMountUnsafe } from '../utils';
import API from '../lib/api';
import { toast } from 'react-toastify';

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [ userData, setUserData ] = useState(getLocalStorageToken());

  function getLocalStorageToken() {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }

  const tokenIsExpired = useMemo(() => {
    if (!userData) return true;
    const dateNow = Date.now();
    const expiresAt = parseInt(userData.expiresAt) * 1000;
    return dateNow >= expiresAt;
  }, [ userData, setUserData ]);

  useOnMountUnsafe(() => {
    async function refresh() {
      if (userData !== null && tokenIsExpired) {
        API.refreshToken(setUserData);
      }
    }
    refresh();
  }, [ userData, setUserData, tokenIsExpired ]);

  const isLoggedIn = userData !== null && !tokenIsExpired;
  
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
