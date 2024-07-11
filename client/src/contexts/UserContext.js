import React, { useState, useEffect, useMemo, createContext } from 'react';

const userContext = {
  id: null,
  username: null,
  accessToken: null,
};

const UserContext = createContext(userContext);

export const UserContextHook = () => {
  const [ userData, setUserData ] = useState(userContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserData(JSON.parse(token));
    }
  }, []);

  const isLoggedIn = useMemo(() => {
    return userData.username !== null;
  }, [ userData ]);

  const logout = () => {
    localStorage.removeItem('token');
    setUserData(userContext);
  };

  return { userData, setUserData, isLoggedIn, logout };
};

export const UserContextWrapper = ({ children }) => {
  const { userData, setUserData } = UserContextHook();

  const contextValue = useMemo(() => ({
    userData,
    setUserData,
  }), [ userData, setUserData ]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
