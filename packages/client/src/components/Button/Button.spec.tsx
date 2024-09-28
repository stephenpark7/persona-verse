import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '@components';
import { BrowserRouter as Router } from 'react-router-dom';

describe('When rendering the button component', () => {
  describe('and the button has a link prop', () => {
    beforeEach(() => {
      render(
        <Router>
          <Button link="/signup">Sign up</Button>
        </Router>,
      );
    });

    it('renders the button with the correct text', () => {
      expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument();
    });

    it('navigates to the correct path when clicked', () => {
      fireEvent.click(screen.getByRole('link', { name: 'Sign up' }));
      expect(window.location.pathname).toBe('/signup');
    });
  });
});
