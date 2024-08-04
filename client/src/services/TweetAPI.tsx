import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TweetData } from '../interfaces';
import { BASE_API_URL, getTweets } from '../api';
import { setTweets } from '../stores';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_API_URL });

export const tweetAPI = createApi({
  reducerPath: 'tweetAPI',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTweets: builder.query<TweetData[], void>({
      queryFn: async () => {
        const tweets = await getTweets();
        return { data: tweets };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        // dispatch(messageCreated('Fetching post...'))
        // console.log('Fetching tweets...');
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          // `onSuccess` side-effect
          // dispatch(messageCreated('Post received!'))
          dispatch(setTweets(data));
          // console.log('Tweets received!');
        } catch (err: unknown) {
          // `onError` side-effect
          // dispatch(messageCreated('Error fetching post!'))
          console.log(err);
        }
      },
    }),
  }),
});

export const { useGetTweetsQuery } = tweetAPI;
