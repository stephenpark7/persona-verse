import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useUserState } from '../../hooks';
import { LogoutButton, TweetContainer, Profile } from '../../components';

import { JWT } from '@shared/types';

export const getDisplayName = (jwt: JWT | null): string => {
  if (!jwt) return '';
  return jwt.payload.username;
};

export const Home: React.FC = (): React.JSX.Element => {
  const { jwt, isLoggedIn } = useUserState();

  const renderBodyContent = () => {
    if (isLoggedIn) {
      return (
        <div>
          <p>Welcome {getDisplayName(jwt)}!</p>
          <Profile />
          <TweetContainer />
          <LogoutButton />
        </div>
      );
    } 

    return (
      <div>
        <p>Create an account or log in.</p>
        <div style={{ display: 'flex', gap: '0.2rem' }}>
          <Link to='/signup'>
            <Button variant="primary">Sign up</Button>
          </Link>
          <Link to='/login'>
            <Button variant="primary">Log in</Button>
          </Link>
        </div>
      </div>
    );
  };

  const bodyContent = renderBodyContent();

  return (
    <Container>
      <Row className='my-5'>
        <Col>
          <h1>Twitter</h1>
          {bodyContent}
        </Col>
      </Row>
    </Container>
  );
};
