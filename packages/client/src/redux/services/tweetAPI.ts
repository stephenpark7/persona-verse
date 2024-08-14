import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TweetData } from '../../interfaces';
import { getTweets } from '../../services';
import { apiConfig } from '../../utils';

const baseQuery = fetchBaseQuery({ baseUrl: apiConfig.baseUrl });

export const tweetAPI = createApi({
  reducerPath: 'tweetAPI',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTweets: builder.query<TweetData[], void>({
      queryFn: async () => {
        const tweets = await getTweets();
        return { data: tweets };
      },
    }),
  }),
});

export const { useGetTweetsQuery } = tweetAPI;
