import { useUserStateStub } from '@mocks';
import { render, screen } from '@testing-library/react';
import { UserType } from '@factories';
import { TweetContainer } from '@components';

vi.mock('@components', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('@components')>()),
    TweetInput: () => <div data-testid="tweet-input">TweetInput</div>,
    TweetButton: () => <div data-testid="tweet-button">TweetButton</div>,
    Tweets: () => <div data-testid="tweets">Tweets</div>,
    TweetContainer: () => (
      <div data-testid="tweet-container">
        <div data-testid="tweet-input">TweetInput</div>
        <div data-testid="tweet-button">TweetButton</div>
        <div data-testid="tweets">Tweets</div>
      </div>
    ),
  };
});

describe('TweetContainer component', () => {
  beforeEach(() => {
    const { jwt, isLoggedIn } = useUserStateStub(UserType.USER)();
    render(<TweetContainer jwt={jwt} isLoggedIn={isLoggedIn} />);
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
