// import { vi } from 'vitest';
// import { useUserState } from '@hooks';
// import { tweetFactory, UserType, useUserStateFactory } from '@factories';
// import { useGetTweetsQuery, usePostTweetMutation } from '@redux';
// import { Tweet } from '@schemas';

// vi.mock('@hooks', async (importOriginal) => {
//   return {
//     ...(await importOriginal<typeof import('@hooks')>()),
//     useUserState: vi.fn(),
//   };
// });

// vi.mock('@redux', async (importOriginal) => {
//   return {
//     ...(await importOriginal<typeof import('@redux')>()),
//     useGetTweetsQuery: vi.fn(),
//     usePostTweetMutation: vi.fn(),
//   };
// });

// export const useUserStateStub = (type: UserType) =>
//   vi.mocked(useUserState).mockImplementation(useUserStateFactory(type));

// export const useGetTweetsQueryStub = (state: 'loading' | 'loaded') =>
//   vi.mocked(useGetTweetsQuery).mockReturnValue({
//     ...useGetTweetsQuery(),
//     data:
//       state === 'loading'
//         ? null
//         : [
//             tweetFactory(),
//             tweetFactory({
//               id: 1,
//             }),
//           ],
//     isLoading: false,
//   });

// export const usePostTweetMutationStub = () => vi.mocked(usePostTweetMutation);

// const usePostTweetMutation: UseMutation<MutationDefinition<{
//   jwt: Jwt;
//   payload: {
//       message: string;
//   };
// }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Tweets", {
//   ...;
// }, "tweetAPI">>

// export const usePostTweetMutationStub = vi.fn();
