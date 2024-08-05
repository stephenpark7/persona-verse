import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RequestBody } from '../../interfaces';
import { submitForm, updateForm } from '../../utils';
import { register } from '../../api';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState<RequestBody>({
    username: '',
    email: '',
    password: '',
  });

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>): void {
    updateForm(e, formData, setFormData);
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    submitForm({
      e,
      formData,
      apiFunction: register,
      navigate,
    });
  };

  return (
    <Container>
      <Row className='my-5'>
        <Col>
          <h1>Sign up</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className='mt-3 mb-3'>
              <Form.Control type='text' name='username' placeholder='Username' onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group className='mt-3 mb-3'>
              <Form.Control type='email' name='email' placeholder='Email' onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control type='password' name='password' placeholder='Password' onChange={handleFormChange} autoComplete='password' required />
            </Form.Group>
            <Button variant='primary' type='submit'>Sign up</Button>{' '}
            <Link to='/'><Button variant='primary'>Go Back</Button></Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
