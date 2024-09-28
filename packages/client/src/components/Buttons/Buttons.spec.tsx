import { Buttons } from '@components';
import { screen, renderWithBrowserRouter } from '@tests/helpers';

describe('When rendering the buttons', () => {
  beforeEach(() => {
    renderWithBrowserRouter(<Buttons />);
  });

  it('displays sign up and log in buttons', () => {
    expect(screen.getByTestId('signup-button')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });
});
