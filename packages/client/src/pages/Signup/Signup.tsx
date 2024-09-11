import React, { useEffect, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RequestBody } from '@schemas';
import { register } from '@services';
import { APP_TITLE, submitForm } from '@utils';
import { Header, Form } from '@components';

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

  return (
    <div>
      <div className="my-5">
        <div>
          <Header title="Sign up" />
          <h2 className="text-xl mb-3 font-medium">Create an account</h2>
          <Form
            handleFormSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
          />
          <p className="mt-3">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
