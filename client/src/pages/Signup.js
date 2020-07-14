import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import './Signup.css';
import axios from 'axios';

export default function Home() {
  const [userData, setUserData] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!userData.username || !userData.email || !userData.password) return;
    axios.post('/api/users/signup', {
      username: userData.username,
      email: userData.email,
      password: userData.password
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err.response.data);
    });
  }

  function handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    setUserData({...userData,
      [name]: value
    });
  }

  return (
    <Container>
      <Jumbotron>
        <h1>Sign up</h1>
        <Form onSubmit={handleSubmit}>

          <Form.Group className='mt-3 mb-3'>
            <Form.Control type='text' name='username' placeholder='Username' onChange={handleChange} required />
          </Form.Group>

          <Form.Group className='mt-3 mb-3'>
            <Form.Control type='email' name='email' placeholder='Email' onChange={handleChange} required />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Control type='password' name='password' placeholder='Password' onChange={handleChange} required />
          </Form.Group>

          <Button variant='primary' type='submit'>Sign up</Button>{' '}
          <Link to='/'><Button variant='primary'>Go Back</Button></Link>

        </Form>
      </Jumbotron>
    </Container>
  )
}