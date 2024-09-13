import { store, setJwt, clearJwt } from '@redux';
import {
  LoginFunction,
  LogoutFunction,
  registerFormFields,
  RegisterFunction,
} from '@schemas';
import { apiCall } from './base';

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
      action: 'signup',
      body: formData,
    },
    showToast: showToast ?? true,
    protocol: 'trpc' as const,
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
  const params = {
    method: 'POST',
    controller: 'users',
    action: 'login',
    body: formData,
    options: { withCredentials: true },
  };

  const response = await apiCall({
    params,
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
  const params = {
    method: 'POST',
    controller: 'users',
    action: 'logout',
    options: { withCredentials: true },
  };

  const response = await apiCall({
    params: params,
    showToast: showToast,
    protocol: 'trpc',
  });

  if (!response) {
    return Promise.resolve(false);
  }

  store.dispatch(clearJwt());
  navigate('/');
  return Promise.resolve(true);
};
