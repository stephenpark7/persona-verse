import React, { useState, useEffect, useMemo, createContext, useContext, useCallback } from 'react';
import API from '../lib/api';

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [ userData, setUserData ] = useState(getLocalStorageToken());

  function getLocalStorageToken() {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }

  const isLoggedIn = useMemo(() => userData !== null, [ userData ]);
  
  const logout = useCallback(async () => {
    if (await API.logout()) {
      setUserData(null);
      localStorage.removeItem('token');
    }
  }, []);

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

// import React, { useState, useEffect, useMemo, createContext, useCallback } from 'react';
// import API from '../lib/api';

// export const userContext = {
//   id: null,
//   username: null,
//   accessToken: null,
// };

// const UserContext = createContext(userContext);

// export function UserContextHook() {
//   const [ userData, setUserData ] = useState(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);

//   const isLoggedIn = useMemo(function() {
//     return userData !== null;
//   }, [ userData ]);
  
//   const logout = useCallback(async function() {
//     await API.logout(userData, setUserData);
//     setUserData(userContext);
//   }, [ userData, setUserData ]);

//   return { userData, setUserData, isLoggedIn, logout };
// }

// export function UserContextWrapper({ children }) {
//   const { userData, setUserData, isLoggedIn, logout } = UserContextHook();

//   const contextValue = useMemo(function() {
//     return {
//       userData,
//       setUserData,
//       isLoggedIn,
//       logout,
//     };
//   }, [ userData, setUserData, isLoggedIn, logout ]);

//   return (
//     <UserContext.Provider value={contextValue}>
//       {children}
//     </UserContext.Provider>
//   );
// }
