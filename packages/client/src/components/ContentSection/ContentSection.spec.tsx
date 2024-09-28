import { usePostTweetMutationStub, useUserStateStub } from '@mocks';
import { renderWithRouter, screen } from '@tests/helpers';
import { UserType } from '@factories';
import { ContentSection } from '@components';

describe('When rendering the content section', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      const { jwt, isLoggedIn } = useUserStateStub(UserType.GUEST)();
      renderWithRouter(<ContentSection jwt={jwt} isLoggedIn={isLoggedIn} />);
    });

    it.skip('displays sign up and log in buttons', () => {
      expect(screen.getByTestId('signup-button')).toBeInTheDocument();
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      // const ptm = usePostTweetMutationStub();
      // console.log('ptm: ' + ptm);
      const { jwt, isLoggedIn } = useUserStateStub(UserType.USER)();
      renderWithRouter(<ContentSection jwt={jwt} isLoggedIn={isLoggedIn} />);
    });

    it('displays the tweet container', () => {
      expect(screen.getByTestId('tweet-container')).toBeInTheDocument();
    });
  });
});
