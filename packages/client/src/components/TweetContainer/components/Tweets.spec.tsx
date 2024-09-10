import { useUserStateStub, useGetTweetsQueryStub } from '@mocks/hooks';
import { render, screen } from '@testing-library/react';
import { Tweets } from './Tweets';
import { UserType } from '@factories';

vi.mock('@components', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('@components')>()),
  };
});

vi.mock('@redux', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('@redux')>()),
    useGetTweetsQuery: vi.fn(),
  };
});

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
