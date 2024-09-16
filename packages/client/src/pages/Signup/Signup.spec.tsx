import { useUserStateStub } from '@mocks';
import { screen } from '@testing-library/react';
import { UserType } from '@factories';
import { renderPage } from '@helpers';
import { Signup } from '@pages';
import { APP_TITLE } from '@utils';

describe('Signup page', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      useUserStateStub(UserType.GUEST);
      renderPage(<Signup />);
    });

    it('has correct title', () => {
      expect(document.title).toBe(`${APP_TITLE} - Sign up`);
    });

    it('renders h1', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Sign up',
      );
    });

    it('renders input fields', () => {
      expect(
        screen.getByRole('textbox', { name: 'Username' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Email' }),
      ).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
    });

    it('renders submit button', () => {
      expect(
        screen.getByRole('button', { name: 'Create account' }),
      ).toBeInTheDocument();
    });
  });
});
