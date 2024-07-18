import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUserContext } from '../contexts/UserContext';
import API from '../lib/api';
import './Signup.css';
import { FormData } from '../interfaces';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUserData } = useUserContext();
  const [ formData, setFormData ] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    API.login(formData, setUserData, navigate);
  }

  function handleTextInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setFormData({
      ...formData,
      [ name ]: value,
    } as FormData);
  }

  return (
    <Container>
      <Row className='my-5'>
        <Col>
          <h1>Log in</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className='mt-3 mb-3'>
              <Form.Control type='text' name='username' placeholder='Username' onChange={handleTextInputChange} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control type='password' name='password' placeholder='Password' onChange={handleTextInputChange} autoComplete='password' required />
            </Form.Group>
            <Button variant='primary' type='submit'>Log in</Button>{' '}
            <Link to='/'><Button variant='primary'>Go Back</Button></Link>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login;
