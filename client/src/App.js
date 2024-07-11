import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { UserContextWrapper } from './contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <UserContextWrapper>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </UserContextWrapper>
  );
}

export default App;
