import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Signup.css';
import axios from 'axios';

import { UserContext } from '../UserContext';

export default function Login() {
  const userContext = useContext(UserContext);
  const { setUserData } = userContext;

  const [userInputData, setUserInputData] = useState(null);
  const history = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!userInputData.username || !userInputData.password) return;
    axios.post('/api/users/login', {
      username: userInputData.username,
      email: userInputData.email,
      password: userInputData.password
    }).then(res => {
      localStorage.setItem('token', JSON.stringify(res.data));
      setUserData(res.data);
      history.push('/');
    }).catch(err => {
      console.log(err.response.data); //.response.data
    });
  }

  function handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    setUserInputData({...userInputData,
      [name]: value
    });
  }

  return (
    <Container>
      <Row className='my-5'>
        <Col>
          <h1>Log in</h1>
          <Form onSubmit={handleSubmit}>

            <Form.Group className='mt-3 mb-3'>
              <Form.Control type='text' name='username' placeholder='Username' onChange={handleChange} required />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Control type='password' name='password' placeholder='Password' onChange={handleChange} required />
            </Form.Group>

            <Button variant='primary' type='submit'>Log in</Button>{' '}
            <Link to='/'><Button variant='primary'>Go Back</Button></Link>

          </Form>
        </Col>
      </Row>
    </Container>
  )
}