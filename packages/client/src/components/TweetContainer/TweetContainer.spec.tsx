import { useUserStateStub } from '@mocks';
import { screen } from '@testing-library/react';
import { UserType } from '@factories';
import { TweetContainer } from '@components';
import { renderWithProviders } from '@core';

describe('TweetContainer component', () => {
  beforeEach(() => {
    const { jwt, isLoggedIn } = useUserStateStub(UserType.USER)();
    renderWithProviders(<TweetContainer jwt={jwt} isLoggedIn={isLoggedIn} />);
  });

  it('renders TweetInput component', () => {
    expect(screen.getByTestId('tweet-input')).toBeInTheDocument();
  });

  it('renders TweetButton component', () => {
    expect(screen.getByTestId('tweet-button')).toBeInTheDocument();
  });

  it('renders Tweets component', () => {
    expect(screen.getByTestId('tweets')).toBeInTheDocument();
  });
});
