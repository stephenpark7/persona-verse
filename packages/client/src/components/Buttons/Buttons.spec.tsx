import { Buttons } from '@components';
import { screen, renderWithRouter } from '@tests/helpers';

describe('When rendering the buttons', () => {
  beforeEach(() => {
    renderWithRouter(<Buttons />);
  });

  it('displays sign up and log in buttons', () => {
    expect(screen.getByTestId('signup-button')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });
});
