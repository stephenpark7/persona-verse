import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@redux';
import { tweetAPI } from '@redux';

export const store = configureStore({
  reducer: {
    ...rootReducer,
    tweetAPI: tweetAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tweetAPI.middleware),
});
