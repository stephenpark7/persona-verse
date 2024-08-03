import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TweetData } from '../../src/interfaces';
import { BASE_API_URL, getTweets } from '../../src/api';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_API_URL });

export const tweetAPI = createApi({
  reducerPath: 'tweetAPI',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTweets: builder.query<TweetData[], void>({
      queryFn: async () => {
        const tweets = await getTweets();
        return {
          data: tweets,
        };
      },
    }),
  }),
});

export const { useGetTweetsQuery } = tweetAPI;
