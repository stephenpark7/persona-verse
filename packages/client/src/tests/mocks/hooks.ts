import { vi } from 'vitest';
import { useUserState } from '@hooks';
import { tweetFactory, UserType, useUserStateFactory } from '@factories';
import { useGetTweetsQuery } from '@redux';

vi.mock('@hooks', () => ({
  useUserState: vi.fn(),
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
            tweetFactory(),
            tweetFactory({
              id: 1,
            }),
          ],
    isLoading: false,
  });
