import { JWT } from './user';
import {
  UsersSignupParams,
  UsersLoginParams,
  TweetPostParams,
  TweetData,
} from './api';

type RequestBody = UsersSignupParams | UsersLoginParams | TweetPostParams;
type SetUserData = React.Dispatch<React.SetStateAction<JWT>>;

export {
  RequestBody,
  TweetPostParams,
  JWT,
  SetUserData,
  TweetData,
};
