import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TweetData } from '../../interfaces';
import { BASE_API_URL, getTweets } from '../../api';
import { getUsers } from '../../trpc';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_API_URL });

export const tweetAPI = createApi({
  reducerPath: 'tweetAPI',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTweets: builder.query<TweetData[], void>({
      queryFn: async () => {
        const users = await getUsers();
        console.log(users);
        const tweets = await getTweets();
        return { data: tweets };
      },
    }),
  }),
});

export const { useGetTweetsQuery } = tweetAPI;
