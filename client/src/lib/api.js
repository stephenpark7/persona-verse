import * as fetchIntercept from 'fetch-intercept';
import { toast } from 'react-toastify';

const hostname = process.env.API_HOST_NAME;
const port = process.env.API_PORT;
const url = `http://${hostname}:${port}`;

async function register(formData, setUserData, navigate) {
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

    // Automatically log in the user after registration
    login(formData, setUserData, navigate);
    navigate('/login');
    return {
      username: formData.username,
      password: formData.password,
    };
  }
  catch (err) {
    toast.error(err.message, { autoClose: 5000 });
    return null;
  }
}

async function login(data, setUserData, navigate, showToast = true) {
  try {
    const response = await fetch(`${url}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
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
  catch (err) {
    toast.error(err.message);
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
  catch (err) {
    toast.error(err.message);
    return false;
  }
}

async function getTweets(token) {
  try {
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

    return responseData;
  }
  catch (err) {
    toast.error(err.message);
    return null;
  }
}

async function postTweet(token, data) {
  try {
    const response = await fetch(`${url}/api/tweets/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  }
  catch (err) {
    toast.error(err.message);
    return false;
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
  response: async function (response) {
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
          return null;
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

        return fetch(response.url, originalRequestConfig);
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

async function refreshToken(setUserData) {
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

export default {
  login,
  register,
  logout,
  getTweets,
  postTweet,
  refreshToken,
};
