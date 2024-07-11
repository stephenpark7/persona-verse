const hostname = process.env.API_HOST_NAME;
const port = process.env.API_PORT;
const url = `http://${hostname}:${port}`;

async function login(data) {
  try {
    const response = await fetch(`${url}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      localStorage.setItem('token', JSON.stringify(responseData));
      // TODO: set user data in state (move logic from Signup.js)
      return responseData;
    } else {
      throw new Error(response);
    }
  }
  catch(err) {
    // TODO: login error logic
    console.log(err);
    return false;
  }
}

async function register(data) {
  try {
    const response = await fetch(`${url}/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      // localStorage.setItem('token', JSON.stringify(responseData));
      // TODO: set user data in state (move logic from Signup.js)
      return responseData;
    } else {
      throw new Error(response);
    }
  }
  catch(err) {
    // TODO: register error logic
    console.log(err);
    return false;
  }
}

export default {
  login,
  register,
};
