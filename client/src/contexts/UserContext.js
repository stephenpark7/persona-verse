import React, { useState, useEffect, useMemo, createContext } from 'react';
import API from '../lib/api';

const userContext = {
  id: null,
  username: null,
  accessToken: null,
};

const UserContext = createContext(userContext);

export function UserContextHook() {
  const [ userData, setUserData ] = useState(userContext);

  useEffect(function() {
    const token = localStorage.getItem('token');
    if (token) {
      setUserData(JSON.parse(token));
    }
  }, [ localStorage.getItem('token') ]);

  const isLoggedIn = useMemo(function() {
    return userData.username !== null;
  }, [ userData ]);

  const logout = async function() {
    const token = userData.accessToken;
    if (token) {
      await API.logout(token);
      setUserData(userContext);
    }
  };

  return { userData, setUserData, isLoggedIn, logout };
}

export function UserContextWrapper({ children }) {
  const { userData, setUserData } = UserContextHook();

  const contextValue = useMemo(function() {
    return {
      userData,
      setUserData,
    };
  }, [ userData, setUserData ]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
