import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Home.css';
import TweetContainer from '../components/TweetContainer';
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
      <Row className='my-5'>
        <Col>
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
              <TweetContainer />
              {/* <p>Welcome {userData.username}!</p> */}
              <br />
              <Button variant="primary" onClick={handleLogout}>Log out</Button>
            </>
          }
        </Col>
      </Row>
    </Container>
  )
}