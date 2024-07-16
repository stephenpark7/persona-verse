import * as fetchIntercept from 'fetch-intercept';
// import { userContext } from '../contexts/UserContext';
import { toast } from 'react-toastify';

const hostname = process.env.API_HOST_NAME;
const port = process.env.API_PORT;
const url = `http://${hostname}:${port}`;

async function register(data, navigate) {
  try {
    const response = await fetch(`${url}/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.status !== 201) {
      throw new Error(responseData.message);
    }

    toast.success('User registered successfully.');
    navigate('/login');
  }
  catch (err) {
    toast.error(err.message, { autoClose: 5000 });
  }
}

async function login(data, setUserData, navigate) {
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
    if (response.status !== 200) {
      throw new Error(responseData.message);
    }

    localStorage.setItem('token', JSON.stringify(responseData));
    setUserData(responseData);

    toast.success('Logged in successfully.');
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
    if (response.status !== 200) {
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

// fetchIntercept.register({
//   request: function (url, config) {
//     config.headers = config.headers || {};
//     return [ url, config ];
//   },
//   requestError: function (error) {
//     return Promise.reject(error);
//   },
//   response: async function (response) {
//     if (response.status === 401 && !response.url.endsWith('/login')) {
//       const baseUrl = `http://${process.env.API_HOST_NAME}:${process.env.API_PORT}/api`;
//       const refreshUrl = `${baseUrl}/refresh`;

//       try {
//         const refreshResponse = await fetch(refreshUrl, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           include: 'credentials',
//         });

//         if (refreshResponse.ok) {
//           const refreshData = await refreshResponse.json();
//           localStorage.setItem('token', refreshData.token);
//           const originalRequestConfig = {
//             ...response.config,
//             headers: {
//               ...response.config.headers,
//               'x-access-token': `${refreshData.token}`,
//             },
//           };
//           return fetch(response.url, originalRequestConfig);
//         } else {
//           toast.error('Please log in again.');
//           localStorage.removeItem('token');
//           setUserData(null);
//         }
//       } catch (error: unknown) {
//         console.error('Error refreshing token:', error);
//         // Handle error
//       }
//     }
//     return response; // Return the original response if not 401
//   },
//   responseError: function (error) {
//     return Promise.reject(error);
//   },
// });

async function getTweets(token) {
  try {
    const response = await fetch(`${url}/api/tweets/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });

    const responseData = await response.json();
    
    if (response.status !== 200) {
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
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    
    if (response.status !== 200) {
      throw new Error(responseData.message);
    }

    return responseData;
  }
  catch (err) {
    toast.error(err.message);
    return false;
  }
}

export default {
  login,
  register,
  logout,
  getTweets,
  postTweet,
};
