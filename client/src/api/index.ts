import * as fetchIntercept from 'fetch-intercept';
import { toast } from 'react-toastify';
import { FormData, PostTweetParams, SetUserData, TweetParams, TweetParamsData, UserData, UserParams } from '../interfaces';
import { NavigateFunction } from 'react-router-dom';

const hostname = process.env.API_HOST_NAME;
const port = process.env.API_PORT;
const url = `http://${hostname}:${port}`;

async function register(
  formData: FormData, 
  setUserData: SetUserData, 
  navigate: NavigateFunction,
): Promise<void> {
  try {
    const response = await fetch(`${url}/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    toast.success('User registered successfully.');

    login(formData, setUserData, navigate);
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message, { autoClose: 5000 });
    }
  }
}

async function login(
  formData: FormData, 
  setUserData: SetUserData, 
  navigate: NavigateFunction, 
  showToast: boolean = true,
) {
  try {
    const response = await fetch(`${url}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    localStorage.setItem('token', JSON.stringify(responseData));
    setUserData(responseData);

    if (showToast) {
      toast.success('Logged in successfully.');
    }
    navigate('/');
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message);
    }
  }
}

async function logout() {
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
    toast.success('Logged out successfully.');
    return true;
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message);
      return false;
    }
  }
}

async function getTweets(
  userData: UserData, 
  setTweetData: React.Dispatch<React.SetStateAction<TweetParamsData>>,
) {
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

    // if (process.env.NODE_ENV === 'development') {
    //   toast.success('Tweets loaded.');
    // }

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
) {
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

    function addUserDataToTweet(responseData: {
      data: TweetParams;
    }, userParams: UserParams): TweetParams {
      const { data } = responseData;
      data.User = {
        username: userParams.payload.username,
        displayName: userParams.payload.displayName,
      };
      return data;
    }

    const enrichedData = addUserDataToTweet(responseData, userData);
    toast.success('Tweet posted.');
    setTweetData([ enrichedData, ...tweetData! ]);
  }
  catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message);
    }
  }
}

async function refreshToken(
  setUserData: SetUserData,
) {
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
      setUserData(null);
      localStorage.removeItem('token');
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      toast.success('Token refreshed.');
    }

    setUserData(responseData);
    localStorage.setItem('token', JSON.stringify(responseData));
  }
  catch (error) {
    toast.error('Error refreshing token.');
    console.error('Error refreshing token:', error);
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
    if (response.status === 401 && !response.url.endsWith('/login')) {
      try {
        const refreshResponse = await fetch(`${url}/api/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        const refreshResponseData = await refreshResponse.json();
  
        if (!refreshResponse.ok) {
          toast.error(refreshResponseData.message);
          // setUserData(null);
          localStorage.removeItem('token');
          throw new Error('Token refresh failed.'); // Throw an error instead of returning null
        }
  
        if (process.env.NODE_ENV === 'development') {
          toast.success('Token refreshed.');
        }
  
        // setUserData(responseData);
        localStorage.setItem('token', JSON.stringify(refreshResponseData));
        const originalRequestConfig = {
          headers: {
            'Authorization': `Bearer ${refreshResponseData.token}`,
          },
        };
  
        return new Promise((resolve, reject) => {
          const returnResponse = fetch(response.url, originalRequestConfig) as Promise<fetchIntercept.FetchInterceptorResponse>;
          if (!returnResponse) {
            reject(new Error('Token refresh failed.'));
          }
          resolve(returnResponse);
        });
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    }
    return response; // Return the original response if not 401
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
