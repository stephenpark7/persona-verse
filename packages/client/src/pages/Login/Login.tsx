import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Header } from '@components';
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
        <div className="flex flex-col">
          <Header title="Log in" />
          <Form
            type="login"
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
            {"Haven't signed up yet? "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline"
            >
              Click here to create an account!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
