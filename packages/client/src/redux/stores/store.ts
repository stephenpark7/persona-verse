import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@redux/index';
import { tweetAPI } from '@redux/index';

export const store = configureStore({
  reducer: {
    ...rootReducer,
    tweetAPI: tweetAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tweetAPI.middleware),
});
