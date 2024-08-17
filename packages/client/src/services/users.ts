import { NavigateFunction } from 'react-router-dom';
import { RegisterFunction, RegisterParams, LoginParams, LoginFunction } from '@interfaces/index';
import { store, setJwt, clearJwt } from '@redux/index';
import { apiCall } from '.';

const register: RegisterFunction = async ({
  formData,
  navigate,
  showToast = true,
  autoLogin = true,
}: RegisterParams): Promise<void> => {
  const response = await apiCall({
    method: 'POST',
    controller: 'users',
    action: 'signup',
    body: formData,
  }, showToast, 'trpc');

  if (!response) return;

  if (autoLogin) {
    await login({
      formData,
      navigate,
      showToast: false,
    });
  }
};

const login: LoginFunction = async ({
  formData,
  navigate,
  showToast = true,
}: LoginParams): Promise<void> => {
  const response = await apiCall({
    method: 'POST',
    controller: 'users',
    action: 'login',
    body: formData,
    options: { withCredentials: true },
  }, showToast, 'trpc');

  if (!response) return;

  if (!response.jwt) {
    throw new Error('JWT data is missing.');
  }

  store.dispatch(setJwt(response.jwt));

  navigate('/'); 
};

async function logout(
  navigate: NavigateFunction,
  showToast = true,
): Promise<void> {
  const response = await apiCall({
    method: 'POST',
    controller: 'users',
    action: 'logout',
    options: { withCredentials: true },
  }, showToast, 'trpc');

  if (!response) return;

  store.dispatch(clearJwt());

  navigate('/');
}

export {
  login,
  logout,
  register,
};
