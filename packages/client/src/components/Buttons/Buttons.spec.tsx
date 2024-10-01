import { Buttons } from '@components';
import { screen, renderWithRouter } from '@tests/helpers';

describe('When rendering the buttons', () => {
  beforeEach(() => {
    renderWithRouter(<Buttons />);
  });

  it('displays sign up and log in buttons', () => {
    expect(screen.getByLabelText('signup-button')).toBeInTheDocument();
    expect(screen.getByLabelText('login-button')).toBeInTheDocument();
  });
});
