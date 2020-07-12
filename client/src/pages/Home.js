import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from 'react-router-dom';

import './Home.css';

export default function Home() {
  return (
    <Container>
      <Jumbotron>
        <h1>Twitter</h1>
        <p>Create an account or log in.</p>
        <Link to='/signup'>
          <Button variant="primary">Sign up</Button>{' '}
        </Link>
        <Button variant="primary">Log in</Button>
      </Jumbotron>
    </Container>
  )
}