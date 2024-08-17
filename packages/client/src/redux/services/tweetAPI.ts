import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TweetData } from '@interfaces/index';
import { getTweets } from '@services/index';
import { apiConfig } from '@utils/index';

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
