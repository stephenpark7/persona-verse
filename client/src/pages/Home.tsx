import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useUserState } from '../stores';
import TweetContainer from '../components/TweetContainer';
import LogoutButton from '../components/LogoutButton';

const Home: React.FC = (): React.JSX.Element => {
  const { userState, isLoggedIn } = useUserState();

  const displayName = userState.jwt?.payload?.username;
  
  function renderBodyContent() {
    if (!isLoggedIn) {
      return (
        <>
          <p>Create an account or log in.</p>
          <Link to='/signup'>
            <Button variant="primary">Sign up</Button>
          </Link>{' '}
          <Link to='/login'>
            <Button variant="primary">Log in</Button>
          </Link>
        </>
      );
    }

    return (
      <>
        <p>Welcome {displayName}!</p>
        <TweetContainer />
        <LogoutButton />
      </>
    );
  }

  return (
    <Container>
      <Row className='my-5'>
        <Col>
          <h1>Twitter</h1>
          {renderBodyContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
