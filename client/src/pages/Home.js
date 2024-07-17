import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useUserContext, isLoggedIn } from '../contexts/UserContext';
import TweetContainer from '../components/TweetContainer';
import LogoutButton from '../components/LogoutButton';

export default function Home() {
  const { userData, isLoggedIn } = useUserContext();

  return (
    <Container>
      <Row className='my-5'>
        <Col>
          <h1>Twitter</h1>
          {!isLoggedIn ? (
            <>
              <p>Create an account or log in.</p>
              <Link to='/signup'>
                <Button variant="primary">Sign up</Button>
              </Link>{' '}
              <Link to='/login'>
                <Button variant="primary">Log in</Button>
              </Link>
            </>
          ) : (
            <>
              <TweetContainer />
              <p>Welcome {userData?.payload.username}!</p>
              <br />
             <LogoutButton />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
