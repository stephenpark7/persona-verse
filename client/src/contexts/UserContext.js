import React, { useState, useMemo, createContext, useContext, useCallback } from 'react';
import API from '../lib/api';

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
  }, [ userData ]);

  const isLoggedIn = useMemo(() => userData !== null && !tokenIsExpired, [ userData ]);
  
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
