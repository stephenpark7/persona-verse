import { UserContext, UserParams } from './user';
import {
  HTTPResponse,
  UsersSignupParams,
  UsersLoginParams,
  TweetPostParams,
} from './api';
import { TweetParams } from './tweet';

type RequestBody = UsersSignupParams | UsersLoginParams | TweetPostParams | null;
type UserData = UserParams | null;
type SetUserData = React.Dispatch<React.SetStateAction<UserData>>;

export {
  RequestBody,
  TweetPostParams,
  UserContext,
  UserData,
  UserParams,
  SetUserData,
  HTTPResponse,
  TweetParams,
};
