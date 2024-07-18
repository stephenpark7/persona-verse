import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import API from '../api';
import { useUserContext } from '../contexts/UserContext';
import { FormData } from '../interfaces';
import './Signup.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { setUserData } = useUserContext();
  const [ formData, setFormData ] = useState<FormData>(null);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!formData) {
      return;
    }
    API.register(formData, setUserData, navigate);
  }

  function handleInputTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [ name ]: value,
    } as FormData);
  }

  return (
    <Container>
      <Row className='my-5'>
        <Col>
          <h1>Sign up</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className='mt-3 mb-3'>
              <Form.Control type='text' name='username' placeholder='Username' onChange={handleInputTextChange} required />
            </Form.Group>
            <Form.Group className='mt-3 mb-3'>
              <Form.Control type='email' name='email' placeholder='Email' onChange={handleInputTextChange} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control type='password' name='password' placeholder='Password' onChange={handleInputTextChange} autoComplete='password' required />
            </Form.Group>
            <Button variant='primary' type='submit'>Sign up</Button>{' '}
            <Link to='/'><Button variant='primary'>Go Back</Button></Link>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default Signup;
