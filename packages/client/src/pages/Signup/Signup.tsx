import React, { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RequestBody } from '@schemas';
import { register } from '@services';
import { submitForm } from '@utils';
import { useUserState } from '@hooks';
import { Header, Form, Button } from '@components';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserState();
  const [formData, setFormData] = useState<RequestBody>({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

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
