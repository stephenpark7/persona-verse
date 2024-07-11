import React, { useState, useEffect, useMemo, createContext } from 'react';

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
  }, []);

  const isLoggedIn = useMemo(function() {
    return userData.username !== null;
  }, [ userData ]);

  const logout = function() {
    localStorage.removeItem('token');
    setUserData(userContext);
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
