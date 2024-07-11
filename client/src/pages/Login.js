import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import API from '../lib/api';
import './Signup.css';

import { UserContext } from '../UserContext';

export default function Login() {
  const userContext = useContext(UserContext);
  const { setUserData } = userContext;

  const [ userInputData, setUserInputData ] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userInputData.username || !userInputData.password) return;
    const result = await API.login(userInputData);
    if (result) {
      setUserData(result);
      navigate('/');
    } else {
      console.log('login error');
    }
  }

  function handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    setUserInputData({...userInputData,
      [name]: value,
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
              <Form.Control type='password' name='password' placeholder='Password' onChange={handleChange} autoComplete='password' required />
            </Form.Group>

            <Button variant='primary' type='submit'>Log in</Button>{' '}
            <Link to='/'><Button variant='primary'>Go Back</Button></Link>

          </Form>
        </Col>
      </Row>
    </Container>
  )
}
