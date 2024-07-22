import * as fetchIntercept from 'fetch-intercept';
import { toast } from 'react-toastify';
import { FormData, PostTweetParams, SetUserData, TweetParams, TweetParamsData, UserData, UserParams,
  EnhancedHTTPResponse,
 } from '../interfaces';
import { NavigateFunction } from 'react-router-dom';

const hostname = process.env.API_HOST_NAME;
const port = process.env.API_PORT;
const url = `http://${hostname}:${port}`;

// Utility function for API calls
async function apiCall(endpoint: string, formData: FormData, options?: RequestInit): Promise<EnhancedHTTPResponse> {
  const response = await fetch(`${url}/api/users/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
    ...options,
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return responseData;
}

// Error handling function
function handleError(err: unknown, autoClose?: number): void {
  if (err instanceof Error) {
    toast.error(err.message, { autoClose });
  }
}

// Refactored register function
async function register(formData: FormData, setUserData: SetUserData, navigate: NavigateFunction): Promise<void> {
  try {
    const responseData = await apiCall('signup', formData);

    toast.success(responseData.message);

    await login(formData, setUserData, navigate, false);
  } catch (err) {
    handleError(err, 5000);
  }
}

// Refactored login function
async function login(formData: FormData, setUserData: SetUserData, navigate: NavigateFunction, showToast: boolean = true): Promise<void> {
  try {
    const responseData = await apiCall('login', formData, { credentials: 'include' });

    localStorage.setItem('token', JSON.stringify(responseData));
    setUserData(responseData);

    if (showToast) {
      toast.success('Logged in successfully.');
    }

    navigate('/');
  } catch (err) {
    handleError(err);
  }
}

async function logout(
  setUserData: SetUserData,
): Promise<void> {
  try {
    const response = await fetch(`${url}/api/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    localStorage.removeItem('token');
    setUserData(null);
    toast.success('Logged out successfully.');
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message);
    }
  }
}

async function getTweets(
  userData: UserData,
  setTweetData: React.Dispatch<React.SetStateAction<TweetParamsData>>,
): Promise<void> {
  try {
    if (!userData) {
      throw new Error('User data is missing.');
    }

    const token = userData.token;

    const response = await fetch(`${url}/api/tweets/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    setTweetData(responseData.data);
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
  tweetData: TweetParamsData,
  setTweetData: React.Dispatch<React.SetStateAction<TweetParamsData>>,
): Promise<void> {
  try {
    if (!userData) {
      throw new Error('User data is missing.');
    }

    const token = userData.token;

    const response = await fetch(`${url}/api/tweets/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    function addUserDataToTweet(
      responseData: { data: TweetParams }, 
      userParams: UserParams,
    ): TweetParams {
      const { data } = responseData;
      data.User = {
        username: userParams.payload.username,
        displayName: userParams.payload.displayName ? userParams.payload.displayName : userParams.payload.username,
      };
      return data;
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
    const response = await fetch(`${url}/api/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const responseData = await response.json();

    if (!response.ok) {
      toast.error(responseData.message);
      if (setUserData) {
        setUserData(null);
      }
      localStorage.removeItem('token');
      return;
    }

    if (setUserData) {
      setUserData(responseData);
    }
    localStorage.setItem('token', JSON.stringify(responseData));
    return responseData;
  }
  catch (error) {
    toast.error('Session expired. Please log in again.');
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
