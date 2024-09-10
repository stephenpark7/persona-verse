import { useUserStateStub, useGetTweetsQueryStub } from '@mocks/hooks';
import { render, screen } from '@testing-library/react';
import { Tweets } from './Tweets';
import { UserType } from '@factories';

describe('When rendering the Tweets component', () => {
  describe('while loading', () => {
    beforeEach(() => {
      useUserStateStub(UserType.USER);
      useGetTweetsQueryStub('loading');
      render(<Tweets />);
    });

    it('displays loading message', () => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('while loaded', () => {
    beforeEach(() => {
      useUserStateStub(UserType.USER);
      useGetTweetsQueryStub('loaded');
      render(<Tweets />);
    });

    it('displays tweets', () => {
      expect(screen.getByText('tweet_0')).toBeInTheDocument();
    });
  });
});
