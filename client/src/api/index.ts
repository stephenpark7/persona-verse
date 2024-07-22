import * as fetchIntercept from 'fetch-intercept';
import { toast } from 'react-toastify';
import {
  FormData, PostTweetParams, SetUserData, TweetParams, TweetParamsData, UserData, UserParams,
  HTTPResponse,
} from '../interfaces';
import { NavigateFunction } from 'react-router-dom';

const hostname = process.env.API_HOST_NAME;
const port = process.env.API_PORT;
const url = `http://${hostname}:${port}`;

async function apiCall(
  method: string,
  controller: string,
  action: string, 
  body: FormData, 
  options?: RequestInit,
  headers?: Record<string, string>,
): Promise<HTTPResponse> {
  const response = await fetch(`${url}/api/${controller}/${action}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
    ...options,
  });

  const responseData: HTTPResponse = await response.json();

  if (!response.ok) {
    const errorMessage = responseData?.message ?? 'An unexpected error occurred.';
    throw new Error(errorMessage);
  }

  return responseData;
}

function handleError(err: unknown, autoClose?: number): void {
  if (err instanceof Error) {
    toast.error(err.message, { autoClose });
  }
}

async function register(
  formData: FormData,
  setUserData: SetUserData,
  navigate: NavigateFunction,
  showToast: boolean = true,
  autoLogin: boolean = true,
): Promise<void> {
  try {
    const responseData = await apiCall('POST', 'users', 'signup', formData);

    if (showToast) {
      toast.success(responseData.message);
    }

    if (autoLogin) {
      await login(formData, setUserData, navigate, false);
    }
  } catch (err) {
    handleError(err, 5000);
  }
}

async function login(formData: FormData, setUserData: SetUserData, navigate: NavigateFunction, showToast: boolean = true): Promise<void> {
  try {
    const responseData = await apiCall('POST', 'users', 'login', formData, { credentials: 'include' });

    localStorage.setItem('token', JSON.stringify(responseData.user));
    setUserData(responseData.user);

    if (showToast) {
      toast.success(responseData.message);
    }

    navigate('/');
  } catch (err) {
    handleError(err);
  }
}

async function logout(setUserData: SetUserData, navigate: NavigateFunction, showToast: boolean = true): Promise<void> {
  try {
    const responseData = await apiCall('POST', 'users', 'logout', null, { credentials: 'include' });

    localStorage.removeItem('token');
    setUserData(null);

    if (showToast) {
      toast.success(responseData.message);
    }

    navigate('/');
  } catch (err) {
    handleError(err);
  }
}

async function getTweets(
  userData: UserData,
  setTweetData: React.Dispatch<React.SetStateAction<TweetParamsData[]>>,
): Promise<void> {
  try {
    if (!userData) {
      throw new Error('User data is missing.');
    }

    const responseData = await apiCall('GET', 'tweets', 'get', null, {}, {
      'Authorization': `Bearer ${userData.token}`,
    });

    setTweetData(responseData.tweets);
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message);
    }
  }
}

async function postTweet(
  userData: UserData,
  payload: PostTweetParams,
  tweetData: TweetParamsData[],
  setTweetData: React.Dispatch<React.SetStateAction<TweetParamsData[]>>,
): Promise<void> {
  try {
    if (!userData) {
      throw new Error('User data is missing.');
    }

    const responseData = await apiCall('POST', 'tweets', 'create', payload, {}, {
      'Authorization': `Bearer ${userData.token}`,
    });


    function addUserDataToTweet(
      responseData: HTTPResponse,
      userParams: UserParams,
    ): TweetParams {
      const { tweet } = responseData;

      if (!tweet) {
        throw new Error('Tweet data is missing.');
      }

      tweet.User = {
        username: userParams.payload.username,
        displayName: userParams.payload.displayName ? userParams.payload.displayName : userParams.payload.username,
      };

      return tweet;
    }

    const enrichedData = addUserDataToTweet(responseData, userData);
    setTweetData([ enrichedData, ...tweetData! ]);
    toast.success('Tweet posted.');
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message);
    }
  }
}

async function refreshToken(
  setUserData?: SetUserData,
): Promise<UserData | void> {
  try {
    const responseData = await apiCall('POST', 'refresh', '', null, { credentials: 'include' });

    const userData = responseData.user;

    if (!userData) {
      throw new Error('User data is missing.');
    }

    if (setUserData) {
      setUserData(userData);
    }

    localStorage.setItem('token', JSON.stringify(userData));

    return userData;
  }
  catch (err: unknown) {
    if (setUserData) {
      setUserData(null);
    }

    localStorage.removeItem('token');
    
    if (err instanceof Error) {
      toast.error(err.message);
    }
  }
}

fetchIntercept.register({
  request: function (url, config) {
    config.headers = config.headers || {};
    return [ url, config ];
  },
  requestError: function (error) {
    return Promise.reject(error);
  },
  response: async function (response): Promise<fetchIntercept.FetchInterceptorResponse> {
    if (response.status !== 401 || response.url.endsWith('/login')) {
      return response;
    }
    try {
      const responseData = await refreshToken();

      if (!responseData) {
        throw new Error('Error refreshing token.');
      }

      const returnResponse = fetch(response.url, {
        headers: {
          'Authorization': `Bearer ${responseData.token}`,
        },
      }) as Promise<fetchIntercept.FetchInterceptorResponse>;

      if (!returnResponse) {
        throw new Error('Error communicating with server.');
      }

      return returnResponse;
    } catch (error) {
      toast.error('Session expired. Please log in again.');
      return response;
    }
  },
  responseError: function (error) {
    return Promise.reject(error);
  },
});

export default {
  login,
  register,
  logout,
  getTweets,
  postTweet,
  refreshToken,
};
