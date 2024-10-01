import { renderWithRouter, screen } from '@tests/helpers';
import { Logo } from '@components';
import { act } from 'react';

describe('Logo', () => {
  beforeEach(() => {
    renderWithRouter(<Logo />);
  });

  it('renders the logo', () => {
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders the logo link', () => {
    expect(screen.getByLabelText('logo-link')).toHaveAttribute('href', '/');
  });

  describe('when clicking the logo link', () => {
    beforeEach(() => {
      act(() => {
        screen.getByLabelText('logo-link').click();
      });
    });

    it('navigates to the home page', () => {
      expect(window.location.pathname).toEqual('/');
    });
  });
});
