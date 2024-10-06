import { render, screen } from '@testing-library/react';
import { Input } from './';

const formData = {
  username: '',
  email: '',
  password: '',
};

const setFormData = vi.fn();

describe('Input', () => {
  beforeEach(() => {
    render(
      <Input
        type="text"
        label="Username"
        value=""
        formDataState={{ formData, setFormData }}
      />,
    );
  });

  it('renders the input element', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
