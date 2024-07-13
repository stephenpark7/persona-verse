import { showToast } from '../utils/toast';

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

  showToast('User registered successfully.');
  navigate('/login');
}
catch(err) {
  showToast(err.message);
}
}

async function login(data, setUserData, navigate) {
  try {
    const response = await fetch(`${url}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.status !== 200) {
      throw new Error(responseData.message);
    }

    localStorage.setItem('token', JSON.stringify(responseData));
    setUserData(responseData);

    showToast('Logged in successfully.');
    navigate('/');
  }
  catch(err) {
    showToast(err.message);
  }
}

async function logout(token) {
  try {
    const response = await fetch(`${url}/api/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });

    const responseData = await response.json();
    if (response.status !== 200) {
      throw new Error(responseData.message);
    }

    localStorage.removeItem('token');

    showToast('Logged out successfully.');
  }
  catch(err) {
    showToast(err.message);
  }
}

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
  catch(err) {
    showToast(err.message);
    throw err;
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
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      return responseData;
    } else {
      throw new Error(response);
    }
  }
  catch(err) {
    // TODO: sendTweet error logic
    console.log(err);
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
