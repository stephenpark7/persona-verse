import { store, setJwt, clearJwt, tweetAPI } from '@redux';
import {
  LoginFormFields,
  LoginFunction,
  LogoutFunction,
  RegisterFormFields,
  registerFormFields,
  RegisterFunction,
} from '@schemas';
import { apiCall } from './base';
import { loginUser, logoutUser, registerUser } from '../trpc';

export const register: RegisterFunction = async ({
  formData: formData,
  navigateFunction: navigate,
  options: { showToast, autoLogin },
}): Promise<boolean> => {
  registerFormFields.parse(formData);

  const response = await apiCall({
    params: {
      method: 'POST',
      controller: 'users',
      action: () => registerUser(formData as RegisterFormFields),
      body: formData,
    },
    showToast: showToast ?? true,
    protocol: 'trpc',
  });

  if (!response) {
    return Promise.resolve(false);
  }

  if (autoLogin) {
    await login({
      formData: formData,
      navigateFunction: navigate,
      options: { showToast },
    });
  }

  return Promise.resolve(true);
};

export const login: LoginFunction = async ({
  formData: formData,
  navigateFunction: navigate,
  options: { showToast },
}): Promise<boolean> => {
  const response = await apiCall({
    params: {
      method: 'POST',
      controller: 'users',
      action: () => loginUser(formData as LoginFormFields),
      body: formData,
      options: { withCredentials: true },
    },
    showToast: showToast ?? true,
    protocol: 'trpc',
  });

  if (!response) {
    return Promise.resolve(false);
  }

  if (!response.jwt) {
    throw new Error('JWT data is missing.');
  }

  store.dispatch(setJwt(response.jwt));
  navigate('/');
  return Promise.resolve(true);
};

export const logout: LogoutFunction = async ({
  navigateFunction: navigate,
  options: { showToast },
}): Promise<boolean> => {
  const response = await apiCall({
    params: {
      method: 'POST',
      controller: 'users',
      action: logoutUser,
      options: { withCredentials: true },
    },
    showToast: showToast,
    protocol: 'trpc',
  });

  if (!response) {
    return Promise.resolve(false);
  }

  store.dispatch(clearJwt());
  store.dispatch(tweetAPI.util.invalidateTags(['Tweets']));
  navigate('/');
  return Promise.resolve(true);
};
