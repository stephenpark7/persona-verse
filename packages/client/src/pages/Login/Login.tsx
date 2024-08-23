import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components';
import { RequestBody } from '@interfaces';
import { login } from '@services';
import { submitForm, updateForm } from '@utils';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState<RequestBody>({
    username: '',
    password: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    updateForm(e, formData, setFormData);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    submitForm({
      e,
      formData,
      apiFunction: login,
      navigate,
    });
  };

  return (
    <div>
      <div className='my-5'>
        <div>
          <h1>Log in</h1>
          <div onSubmit={handleFormSubmit}>
            <div className='mt-3 mb-3'>
              <input type='text' name='username' placeholder='Username' onChange={handleFormChange} required />
            </div>
            <div className='mb-3'>
              <input type='password' name='password' placeholder='Password' onChange={handleFormChange} autoComplete='password' required />
            </div>
            <Button variant='primary' type='submit'>Log in</Button>{' '}
            <Link to='/'><Button variant='primary'>Go Back</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};
