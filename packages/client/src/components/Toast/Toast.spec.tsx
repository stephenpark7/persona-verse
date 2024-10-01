import { render, screen } from '@tests/helpers';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders the toast', () => {
    render(<Toast />);
    expect(screen.getByClassName('Toastify')).toBeInTheDocument();
  });
});
