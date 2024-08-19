import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getDisplayName } from '@utils';
import { useUserState } from '@hooks';
import { LogoutButton, TweetContainer, Profile } from '@components';

export const Home: React.FC = (): React.JSX.Element => {
  const { jwt, isLoggedIn } = useUserState();

  useEffect(() => {
    document.title = 'PersonaVerse';
  }, []);

  const bodyContent = useMemo(() => {
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
          <Link className='signup-link' to='/signup'>
            <Button variant="primary">Sign up</Button>
          </Link>
          <Link to='/login'>
            <Button variant="primary">Log in</Button>
          </Link>
        </div>
      </div>
    );
  }, [ isLoggedIn ]);

  return (
    <Container>
      <Row className='my-5'>
        <Col>
          <h1>PersonaVerse</h1>
          {bodyContent}
        </Col>
      </Row>
    </Container>
  );
};
