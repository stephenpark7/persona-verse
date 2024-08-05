import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../slices';
import { tweetAPI } from '../services/TweetAPI';

export const store = configureStore({
  reducer: {
    ...rootReducer,
    tweetAPI: tweetAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tweetAPI.middleware),
});
