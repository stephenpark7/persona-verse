import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from 'react-router-dom';

import './Home.css';

import { UserContext } from '../UserContext';

export default function Home() {
  const userContext = useContext(UserContext);
  const { userData, setUserData } = userContext;

  function handleLogout() {
    localStorage.setItem('token', null);
    setUserData(null);
  }

  return (
    <Container>
      <Jumbotron>
        <h1>Twitter</h1>
        {!userData ? 
          <>
            <p>Create an account or log in.</p>
            <Link to='/signup'>
              <Button variant="primary">Sign up</Button>{' '}
            </Link>
            <Link to='/login'>
              <Button variant="primary">Log in</Button>
            </Link>
          </>
          : 
          <>
            <p>Welcome {userData.username}!</p>
            <Button variant="primary" onClick={handleLogout}>Log out</Button>
          </>
        }
      </Jumbotron>
    </Container>
  )
}