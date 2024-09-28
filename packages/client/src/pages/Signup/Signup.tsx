import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RequestBody } from '@schemas';
import { register } from '@services';
import { submitForm } from '@utils';
import { Header, Form, Button } from '@components';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RequestBody>({
    username: '',
    email: '',
    password: '',
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    submitForm({
      e,
      formData,
      apiFunction: register,
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
        <div className="flex flex-col">
          <Header title="Sign up" />
          <Form
            type="signup"
            handleFormSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
          />
          <Button
            name="go-back"
            overrideCSS="w-full"
            link="/"
          >
            Go back home
          </Button>
          <p className="text-sm mt-4">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-500 hover:underline"
            >
              Click here to log in!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
