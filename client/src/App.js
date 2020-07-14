import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { UserContext } from './UserContext';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUserData(JSON.parse(token));
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Switch>
          <Route path='/signup'><Signup /></Route>
          <Route path='/login'><Login /></Route>
          <Route path='/'><Home /></Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
