import { store, setJwt, clearJwt } from '@redux';
import {
  LoginFunction,
  LogoutFunction,
  registerFormFields,
  RegisterFunction,
} from '@schemas';
import { apiCall } from './base';

export const register: RegisterFunction = async (
  formData,
  navigate,
  { showToast, autoLogin },
): Promise<boolean> => {
  registerFormFields.parse(formData);

  const response = await apiCall(
    {
      method: 'POST',
      controller: 'users',
      action: 'signup',
      body: formData,
    },
    showToast ?? true,
    'trpc',
  );

  if (!response) {
    return Promise.resolve(false);
  }

  if (autoLogin) {
    await login(formData, navigate, { showToast });
  }

  return Promise.resolve(true);
};

export const login: LoginFunction = async (
  formData,
  navigate,
  { showToast },
): Promise<boolean> => {
  const response = await apiCall(
    {
      method: 'POST',
      controller: 'users',
      action: 'login',
      body: formData,
      options: { withCredentials: true },
    },
    showToast ?? true,
    'trpc',
  );

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

export const logout: LogoutFunction = async (
  _,
  navigate,
  { showToast },
): Promise<boolean> => {
  const params = {
    method: 'POST',
    controller: 'users',
    action: 'logout',
    options: { withCredentials: true },
  };

  const response = await apiCall(params, showToast, 'trpc');

  if (!response) {
    return Promise.resolve(false);
  }

  store.dispatch(clearJwt());
  navigate('/');
  return Promise.resolve(true);
};
