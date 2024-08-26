import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TweetData } from '@interfaces';
import { getTweets, postTweet } from '@services';
import { apiConfig } from '@utils';
import { JWT } from '@shared';

const baseQuery = fetchBaseQuery({ 
  baseUrl: apiConfig.baseUrl, 
});

export const tweetAPI = createApi({
  reducerPath: 'tweetAPI',
  baseQuery: baseQuery,
  tagTypes: [ 'Tweets' ],
  endpoints: (builder) => ({
    getTweets: builder.query<TweetData[], void>({
      queryFn: async () => {
        const tweets = await getTweets();
        return { data: tweets };
      },
      providesTags: [ 'Tweets' ],
    }),
    postTweet: builder.mutation<TweetData, { jwt: JWT, payload: { message: string } }>({
      queryFn: async (arg) => {
        const { jwt, payload } = arg;
        const tweet = await postTweet({ jwt, payload });
        return { data: tweet };
      },
      invalidatesTags: [ 'Tweets' ],
    }),
  }),
});

export const { 
  useGetTweetsQuery, 
  usePostTweetMutation, 
} = tweetAPI;
