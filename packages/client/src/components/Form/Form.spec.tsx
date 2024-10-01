import { render, screen } from '@testing-library/react';
import { Form } from '@components';

const handleFormSubmit = vi.fn();

const setFormData = vi.fn();

const formData = {
  username: '',
  email: '',
  password: '',
};

describe('When rendering the form component', () => {
  describe('and the type is signup', () => {
    beforeEach(() => {
      render(
        <Form
          type={'signup'}
          handleFormSubmit={handleFormSubmit}
          setFormData={setFormData}
          formData={formData}
        />,
      );
    });

    it('displays the form', () => {
      expect(
        screen.getByRole('textbox', { name: 'Username' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Email' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'form-signup-button' }),
      ).toBeInTheDocument();
    });

    it('does not display the log in button', () => {
      expect(
        screen.queryByRole('button', { name: 'form-login-button' }),
      ).not.toBeInTheDocument();
    });
  });

  describe('and the type is login', () => {
    beforeEach(() => {
      render(
        <Form
          type={'login'}
          handleFormSubmit={handleFormSubmit}
          setFormData={setFormData}
          formData={formData}
        />,
      );
    });

    it('displays the form', () => {
      expect(
        screen.getByRole('textbox', { name: 'Username' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('textbox', { name: 'Email' }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'form-login-button' }),
      ).toBeInTheDocument();
    });

    it('does not display the sign up button', () => {
      expect(
        screen.queryByRole('button', { name: 'form-signup-button' }),
      ).not.toBeInTheDocument();
    });
  });
});
