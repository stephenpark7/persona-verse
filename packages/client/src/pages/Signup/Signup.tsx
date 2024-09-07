import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RequestBody } from 'src/schemas';
import { register } from '@services';
import { submitForm, updateForm } from '@utils';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  // TODO: have an initial state constant for the form data
  const [formData, setFormData] = useState<RequestBody>({
    username: '',
    email: '',
    password: '',
  });

  // TODO: set document title in router component instead
  useEffect(() => {
    document.title = 'Sign up - PersonaVerse';
  }, []);

  // TODO: simply pass the function to form component instead of using wrapper methods

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    updateForm(e, formData, setFormData);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    submitForm(e, formData, register, navigate, {
      showToast: true,
      autoLogin: true,
    });
  };

  // TODO: modularize form components
  return (
    <div>
      <div className="my-5">
        <div>
          <h1>Sign up</h1>
          <form
            className="signup-form"
            onSubmit={handleFormSubmit}
          >
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
                type="email"
                name="email"
                placeholder="Email"
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
            <button
              className="primary"
              type="submit"
            >
              Sign up
            </button>
          </form>
          <p className="mt-3">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
