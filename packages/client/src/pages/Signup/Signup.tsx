import React, { useEffect, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RequestBody } from '@schemas';
import { register } from '@services';
import { APP_TITLE, submitForm } from '@utils';
import { Header } from '@components';
import { Input, Label } from '../../components/Form';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RequestBody>({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    document.title = `${APP_TITLE} - Sign up`;
  }, []);

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
          <Header title="Sign up" />
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
