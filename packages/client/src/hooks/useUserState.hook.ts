import { useAxiosInterceptors } from '../interceptors';
import { useJwt, useTweets } from '../redux';

export const useUserState = () => {
  const jwt = useJwt();
  const tweets = useTweets();
  const isLoggedIn = jwt !== null;

  useAxiosInterceptors(jwt);

  return {
    jwt,
    isLoggedIn,
    tweets,
  };
};