import { useSelector } from 'react-redux';
import type { store } from '../stores';

export const useJwt = () =>
  useSelector(
    (state: ReturnType<typeof store.getState>) => state.user.value.jwt,
  );

export const useTweets = () =>
  useSelector(
    (state: ReturnType<typeof store.getState>) => state.user.value.tweets,
  );
