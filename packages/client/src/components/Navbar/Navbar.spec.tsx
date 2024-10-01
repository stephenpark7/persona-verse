import { act } from 'react';
import { renderWithRouter, screen } from '@tests/helpers';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    renderWithRouter(<Navbar />);
  });

  it('renders the navbar', () => {
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('renders the logo', () => {
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders the burger menu', () => {
    expect(screen.getByTestId('navbar-burger-menu')).toBeInTheDocument();
  });

  it('does not render the dropdown menu', () => {
    expect(screen.queryByTestId('navbar-dropdown')).not.toBeInTheDocument();
  });

  describe('when clicking the burger menu', () => {
    beforeEach(() => {
      act(() => {
        screen.getByTestId('navbar-burger-menu').click();
      });
    });

    it('renders the dropdown menu', () => {
      expect(screen.getByTestId('navbar-dropdown')).toBeInTheDocument();
    });

    it('hides the burger menu', () => {
      expect(
        screen.queryByTestId('navbar-burger-menu'),
      ).not.toBeInTheDocument();
    });

    describe('when clicking the close button', () => {
      beforeEach(() => {
        act(() => {
          screen.getByTestId('navbar-close-button').click();
        });
      });

      it('renders the burger menu', () => {
        expect(screen.getByTestId('navbar-burger-menu')).toBeInTheDocument();
      });

      it('hides the dropdown menu', () => {
        expect(screen.queryByTestId('navbar-dropdown')).not.toBeInTheDocument();
      });
    });
  });

  describe('when clicking the logo', () => {
    beforeEach(() => {
      act(() => {
        screen.getByTestId('logo').click();
      });
    });

    it('hides the dropdown menu', () => {
      expect(screen.queryByTestId('navbar-dropdown')).not.toBeInTheDocument();
    });

    it('renders the burger menu', () => {
      expect(screen.getByTestId('navbar-burger-menu')).toBeInTheDocument();
    });
  });
});
