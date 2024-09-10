import { vi } from 'vitest';
import { useUserState } from '@hooks';
import { UserType, useUserStateFactory } from '@factories';
import { useGetTweetsQuery } from '@redux';

vi.mock('@hooks', () => ({
  useUserState: vi.fn(),
  // usePostTweetMutation: vi.fn(),
  // useDispatch: vi.fn(),
  // useAppStoreDispatch: vi.fn(),
}));

vi.mock('@redux', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('@redux')>()),
    useGetTweetsQuery: vi.fn(),
  };
});

export const useUserStateStub = (type: UserType) =>
  vi.mocked(useUserState).mockImplementation(useUserStateFactory(type));

export const useGetTweetsQueryStub = (state: 'loading' | 'loaded') =>
  vi.mocked(useGetTweetsQuery).mockReturnValue({
    ...useGetTweetsQuery(),
    data:
      state === 'loading'
        ? null
        : [
            {
              id: 'tweet_0',
              message: 'tweet_0',
              createdAt: '2021-09-01T00:00:00.000Z',
              User: {
                username: 'user_0',
              },
            },
            {
              id: 'tweet_1',
              message: 'tweet_1',
              createdAt: '2021-09-01T00:00:00.000Z',
              User: {
                username: 'user_1',
              },
            },
          ],
    isLoading: false,
  });
