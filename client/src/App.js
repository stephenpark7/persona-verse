import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { UserContext } from './UserContext';

function App() {
  const [ userData, setUserData ] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUserData(JSON.parse(token));
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
