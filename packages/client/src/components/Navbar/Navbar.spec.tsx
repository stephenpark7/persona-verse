import { act } from 'react';
import { renderWithRouter, screen } from '@tests/helpers';
import { Navbar } from '@components';

describe('When rendering the navbar', () => {
  beforeEach(() => {
    renderWithRouter(<Navbar />);
  });

  it('renders the logo', () => {
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders the burger menu', () => {
    expect(screen.getByTestId('burger-menu')).toBeInTheDocument();
  });

  it('does not render the dropdown menu', () => {
    expect(screen.queryByTestId('navbar-dropdown')).not.toBeInTheDocument();
  });

  describe('when clicking the menu button', () => {
    beforeEach(() => {
      act(() => {
        screen.getByTestId('burger-menu').click();
      });
    });

    it('hides the burger menu', () => {
      expect(screen.queryByTestId('burger-menu')).not.toBeInTheDocument();
    });

    it('displays the dropdown menu', () => {
      expect(screen.getByTestId('navbar-dropdown')).toBeInTheDocument();
    });

    describe('when clicking the close button', () => {
      beforeEach(() => {
        act(() => {
          screen.getByTestId('navbar-close-button').click();
        });
      });

      it('hides the dropdown menu', () => {
        expect(screen.queryByTestId('navbar-dropdown')).not.toBeInTheDocument();
      });

      it('displays the burger menu', () => {
        expect(screen.getByTestId('burger-menu')).toBeInTheDocument();
      });
    });
  });
});
