import { Mock } from 'vitest';
import { useUserState } from './useUserState';
import { useJwt, useTweets } from '@redux';

vi.mock('@redux', () => ({
  useJwt: vi.fn(),
  useTweets: vi.fn(),
}));

describe('useUserState', () => {
  it('should return jwt, isLoggedIn as true, and tweets when jwt is present', () => {
    const mockJwt = 'mockJwtToken';
    const mockTweets = ['tweet1', 'tweet2'];

    (useJwt as Mock).mockReturnValue(mockJwt);
    (useTweets as Mock).mockReturnValue(mockTweets);

    const result = useUserState();

    expect(result.jwt).toBe(mockJwt);
    expect(result.isLoggedIn).toBe(true);
    expect(result.tweets).toBe(mockTweets);
  });

  it('should return jwt, isLoggedIn as false, and tweets when jwt is not present', () => {
    const mockJwt = null;
    const mockTweets = ['tweet1', 'tweet2'];

    (useJwt as Mock).mockReturnValue(mockJwt);
    (useTweets as Mock).mockReturnValue(mockTweets);

    const result = useUserState();

    expect(result.jwt).toBe(mockJwt);
    expect(result.isLoggedIn).toBe(false);
    expect(result.tweets).toBe(mockTweets);
  });
});
