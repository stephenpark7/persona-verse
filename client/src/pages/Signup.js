import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import { Link } from 'react-router-dom';

import './Signup.css';

export default function Home() {
  return (
    <Container>
      <Jumbotron>
        <h1>Sign up</h1>

        <InputGroup className="mt-3 mb-3">
          <FormControl placeholder="Username" aria-label="Username" />
        </InputGroup>

        <InputGroup className="mt-3 mb-3">
          <FormControl placeholder="Email" aria-label="Email" />
        </InputGroup>

        <InputGroup className="mb-3">
          <FormControl placeholder="Password" aria-label="Password" />
        </InputGroup>

        <Button variant="primary">Sign up</Button>{' '}
        <Link to='/'><Button variant="primary">Go Back</Button></Link>

      </Jumbotron>
    </Container>
  )
}