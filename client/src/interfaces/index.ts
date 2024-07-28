import { JWT } from './user';
import {
  UsersSignupParams,
  UsersLoginParams,
  TweetPostParams,
} from './api';
import { TweetParams } from './tweet';

type RequestBody = UsersSignupParams | UsersLoginParams | TweetPostParams | null;
type SetUserData = React.Dispatch<React.SetStateAction<JWT>>;

export {
  RequestBody,
  TweetPostParams,
  JWT,
  SetUserData,
  TweetParams,
};
