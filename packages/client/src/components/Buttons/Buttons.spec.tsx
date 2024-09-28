import { Buttons } from '@components';
import { screen, renderWithBrowserRouter } from '@tests/helpers';

describe('When rendering the buttons', () => {
  beforeEach(() => {
    renderWithBrowserRouter(<Buttons />);
  });

  it('displays sign up and log in buttons', () => {
    screen.debug();
    expect(screen.getByTestId('sign-up-button')).toBeInTheDocument();
    expect(screen.getByTestId('log-in-button')).toBeInTheDocument();
  });
});
