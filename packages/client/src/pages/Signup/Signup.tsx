import React, { useEffect, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RequestBody } from '@schemas';
import { register } from '@services';
import { submitForm } from '@utils';
// import { useDocumentTitle } from '@hooks';
import { Header } from '../Home/components';
import { Input, Label } from '../../components/Form';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  // TODO: have an initial state constant for the form data
  const [formData, setFormData] = useState<RequestBody>({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    document.title = 'PersonaVerse - Sign up';
  }, []);

  // TODO: simply pass the function to form component instead of using wrapper methods

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    if (
      formData.username === undefined ||
      formData.email === undefined ||
      formData.password === undefined
    ) {
      return;
    }

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
          <Header title="Register" />
          <h2 className="text-xl mb-3 font-medium">Create an account</h2>
          <form
            className="signup-form"
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-col gap-3">
              <div className="flex">
                <Label label="Username" />
                <Input
                  label="Username"
                  type="text"
                  value={formData.username}
                  formDataState={{ formData, setFormData }}
                />
              </div>
              <div className="flex">
                <Label label="Email" />
                <Input
                  label="Email"
                  type="text"
                  value={formData.email}
                  formDataState={{ formData, setFormData }}
                />
              </div>
              <div className="flex">
                <Label label="Password" />
                <Input
                  label="Password"
                  type="password"
                  value={formData.password}
                  formDataState={{ formData, setFormData }}
                />
              </div>
            </div>
            <button
              aria-label="Sign up"
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
