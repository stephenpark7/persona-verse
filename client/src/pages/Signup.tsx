import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; // Import FormControlElement type from react-bootstrap
import API from '../lib/api';
import './Signup.css';

interface FormData {
  username: string;
  email: string;
  password: string;
};

const Signup: React.FC = () => {
  const [ formData, setFormData ] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!formData) return;
    if (!formData.username || !formData.email || !formData.password) return;
    const data = await API.register(formData, navigate);
    if (data) {
      await API.login(data, setFormData, navigate, false);
    }
  }

  function handleInputTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setFormData({ ...formData, [ name ]: value });
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
