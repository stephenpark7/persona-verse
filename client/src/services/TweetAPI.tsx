// import type {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';
import { TweetData } from '../../src/interfaces';
import { BASE_API_URL, getTweets } from '../../src/api';
import { store, setTweets } from '../../src/stores';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_API_URL });

// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions)
//   if (result.error && result.error.status === 401) {
//     // try to get a new token
//     const refreshResult = await baseQuery('/refresh', api, extraOptions)
//     if (refreshResult.data) {
//       // store the new token
//       // api.dispatch(tokenReceived(refreshResult.data))
//       // retry the initial query
//       result = await baseQuery(args, api, extraOptions)
//     } else {
//       // api.dispatch(loggedOut())
//     }
//   }
//   return result;
// };

// Define a service using a base URL and expected endpoints
export const tweetAPI = createApi({
  reducerPath: 'tweetAPI',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTweets: builder.query<TweetData[], string>({
      queryFn: async (arg: string) => {
        try {
          const setTweetData = JSON.parse(arg ?? null);
          const tweets = await getTweets(setTweetData);
          store.dispatch(setTweets(tweets));
          // TODO: need to update state
          // setTweetData(tweets);
          // however, since we are using redux
          // we should store setTweetData in the store
          return { data: tweets };
        }
        catch (err: unknown) {
          throw new Error(err as string);
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTweetsQuery } = tweetAPI;
