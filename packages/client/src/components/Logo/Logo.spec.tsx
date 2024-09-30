import { renderWithRouter, screen } from '@tests/helpers';
import { Logo } from '@components';

describe('When rendering the logo', () => {
  beforeEach(() => {
    renderWithRouter(<Logo />);
  });

  it('displays the logo', () => {
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('displays the logo link', () => {
    expect(screen.getByTestId('logo-link')).toHaveAttribute('href', '/');
  });
});
