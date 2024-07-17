import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useOnMountUnsafe, getLocalStorageToken } from '../utils';
import API from '../lib/api';

interface UserData {
  username: string;
  email: string;
  expiresAt: string;
  token: string;
}

interface UserContextValue {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
}

const defaultUserContextValue: UserContextValue = {
  userData: null,
  setUserData: () => {},
  isLoggedIn: false,
  logout: async () => {},
};

export const UserContext = createContext(defaultUserContextValue);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
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
    <UserContext.Provider value={contextValue as UserContextValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
