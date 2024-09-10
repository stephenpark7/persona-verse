import { useUserStateStub } from '@mocks';
import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserType } from '@factories';
import { TweetContainer } from '@components';

vi.mock('@components', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('@components')>()),
    TweetInput: () => <div>TweetInput</div>,
    TweetButton: () => <div>TweetButton</div>,
    Tweets: () => <div>Tweets</div>,
    TweetContainer: () => (
      <div>
        <div>TweetInput</div>
        <div>TweetButton</div>
        <div>Tweets</div>
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
    expect(screen.getByText('TweetInput')).toBeInTheDocument();
  });

  it('renders TweetButton component', () => {
    expect(screen.getByText('TweetButton')).toBeInTheDocument();
  });

  it('renders Tweets component', () => {
    expect(screen.getByText('Tweets')).toBeInTheDocument();
  });
});
