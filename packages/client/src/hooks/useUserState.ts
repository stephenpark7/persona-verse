import { useAxiosInterceptors } from '../interceptors';
import { useJwt, useTweets } from '@redux/index';

export const useUserState = () => {
  const jwt = useJwt();
  const tweets = useTweets();
  const isLoggedIn = !!jwt;

  if (isLoggedIn) {
    useAxiosInterceptors(jwt);
  }

  return {
    jwt,
    isLoggedIn,
    tweets,
  };
};
