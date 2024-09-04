import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RequestBody } from 'src/schemas';
import { register } from '@services';
import { submitForm, updateForm } from '@utils';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RequestBody>({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    document.title = 'Sign up - PersonaVerse';
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    updateForm(e, formData, setFormData);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    submitForm({
      e,
      formData,
      apiFunction: register,
      navigate,
    });
  };

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
