import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components';
import { loginFormFields, RequestBody } from '@schemas';
import { login } from '@services';
import { submitForm, updateForm } from '@utils';

// TODO: use form component

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RequestBody>({
    username: '',
    password: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    updateForm(e, formData, setFormData);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    loginFormFields.parse(formData);

    submitForm({
      e,
      formData,
      apiFunction: login,
      navigate,
      options: {
        showToast: true,
        autoLogin: true,
      },
    });
  };

  return (
    <div>
      <div className="my-5">
        <div>
          <h1>Log in</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="mt-3 mb-3">
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleFormChange}
                autoComplete="password"
                required
              />
            </div>
            <Button type="submit">Log in</Button>{' '}
            <Link to="/">
              <Button>Go Back</Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
