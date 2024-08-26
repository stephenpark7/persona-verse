import { NavigateFunction } from 'react-router-dom';
import { RegisterFunction, RegisterParams, LoginParams, LoginFunction } from '@interfaces';
import { store, setJwt, clearJwt } from '@redux';
import { apiCall } from '.';

export const register: RegisterFunction = async ({
  formData,
  navigate,
  showToast = true,
  autoLogin = true,
}: RegisterParams): Promise<boolean> => {
  const response = await apiCall({
    method: 'POST',
    controller: 'users',
    action: 'signup',
    body: formData,
  }, showToast, 'trpc');

  if (!response) {
    return Promise.resolve(false);
  }

  if (autoLogin) {
    await login({
      formData,
      navigate,
      showToast: false,
    });
  }

  return Promise.resolve(true);
};

export const login: LoginFunction = async ({
  formData,
  navigate,
  showToast = true,
}: LoginParams): Promise<boolean> => {
  const response = await apiCall({
    method: 'POST',
    controller: 'users',
    action: 'login',
    body: formData,
    options: { withCredentials: true },
  }, showToast, 'trpc');

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

export const logout = async (
  navigate: NavigateFunction,
  showToast = true,
): Promise<boolean> => {
  const response = await apiCall({
    method: 'POST',
    controller: 'users',
    action: 'logout',
    options: { withCredentials: true },
  }, showToast, 'trpc');

  if (!response) {
    return Promise.resolve(false);
  }

  store.dispatch(clearJwt());
  navigate('/');
  return Promise.resolve(true);
};
