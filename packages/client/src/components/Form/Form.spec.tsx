import { render, screen } from '@testing-library/react';
import { Form } from '@components';

const handleFormSubmit = vi.fn();

const formData = {
  username: '',
  email: '',
  password: '',
};

const setFormData = vi.fn();

describe('When rendering the form component', () => {
  beforeEach(() => {
    render(
      <Form
        handleFormSubmit={handleFormSubmit}
        formData={formData}
        setFormData={setFormData}
      />,
    );
  });

  it('displays the form', () => {
    expect(
      screen.getByRole('textbox', { name: 'Username' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });
});
