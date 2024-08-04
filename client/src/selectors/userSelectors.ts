import { useSelector } from 'react-redux';
import type { store } from '../stores';

const useJwt = () => useSelector((state: ReturnType<typeof store.getState>) => state.user.value.jwt);

const useTweets = () => useSelector((state: ReturnType<typeof store.getState>) => state.user.value.tweets);

export { useJwt, useTweets };

// const useUserSelectors = () => {

// const useJwt = () => useSelector((state: ReturnType<typeof store.getState>) => state.user.value.jwt);

// const useTweets = () => useSelector((state: ReturnType<typeof store.getState>) => state.user.value.tweets);

//   export { useJwt, useTweets };

//   return {
//     useJwt,
//     useTweets,
//   };
// };

// export { useUserSelectors };


// import { State } from '../interfaces/user';

// export const selectJwt = (state: State) => state.value.jwt;
// export const selectTweets = (state: State) => state.value.tweets;
