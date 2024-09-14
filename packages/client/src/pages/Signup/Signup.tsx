import React, { useEffect, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RequestBody } from '@schemas';
import { register } from '@services';
import { APP_TITLE, submitForm } from '@utils';
import { Header, Form, Button } from '@components';

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

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="my-5">
        <div className="flex flex-col">
          <Header title="Sign up" />
          <Form
            handleFormSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
          />
          <Button
            // extraStyles="border rounded-md p-3 hover:bg-gray-100 mb-4 font-medium"
            onClickEvent={handleGoBack}
          >
            Go back
          </Button>
          <p className="text-sm">
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
