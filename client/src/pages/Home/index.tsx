import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { JWT } from 'src/interfaces';
import { useUserState } from '../../stores';
import { TweetContainer } from '../../components/TweetContainer';
import { LogoutButton } from '../../components/LogoutButton';
import { HomeProps } from './interface';

export const Home = () => {
  const { jwt, isLoggedIn } = useUserState();
  return (
    <BaseHome
      jwt={jwt}
      isLoggedIn={isLoggedIn}
    />
  );  
};

function getDisplayName(jwt: JWT | null): string {
  if (!jwt) return '';
  return jwt.payload.username;
}

export const BaseHome: React.FC<HomeProps> = ({ 
  jwt, 
  isLoggedIn 
}): React.JSX.Element => {

  function renderBodyContent() {
    if (isLoggedIn) {
      return (
        <div>
          <p>Welcome {getDisplayName(jwt)}!</p>
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
  }

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
