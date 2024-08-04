import { useSelector } from 'react-redux';
// import { useJwt, useTweets } from '../selectors/userSelectors';
import { useAxiosInterceptors } from '../stores';
import { useJwt, useTweets } from '../selectors/userSelectors';

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
