import { useSelector } from 'react-redux';
import type { store } from '../stores';

const useJwt = () => useSelector((state: ReturnType<typeof store.getState>) => state.user.value?.jwt);

const useTweets = () => useSelector((state: ReturnType<typeof store.getState>) => state.user.value?.tweets);

export { useJwt, useTweets };
