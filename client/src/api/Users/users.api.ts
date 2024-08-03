import { NavigateFunction } from 'react-router-dom';
import { Login, RegisterFunction, RegisterParams } from '../../interfaces/api';
import { apiCall } from '../index';
import { store, setJwt, clearJwt } from '../../stores';

const register: RegisterFunction = async ({
  formData,
  navigate,
  showToast = true,
  autoLogin = true,
}: RegisterParams): Promise<void> => {
  const data = await apiCall({
    method: 'POST',
    controller: 'users',
    action: 'signup',
    body: formData,
  }, showToast);

  if (!data) return;

  if (autoLogin) {
    await login({
      formData,
      navigate,
      showToast: false,
    });
  }
};

async function login({
  formData,
  navigate,
  showToast = true,
}: Login): Promise<void> {
  const data = await apiCall({
    method: 'POST',
    controller: 'users',
    action: 'login',
    body: formData,
    options: { withCredentials: true },
  }, showToast);

  if (!data) return;

  if (!data.jwt) {
    throw new Error('JWT data is missing.');
  }

  store.dispatch(setJwt(data.jwt));

  navigate('/'); 
}

async function logout(
  navigate: NavigateFunction,
  showToast: boolean = true,
): Promise<void> {
  const response = await apiCall({
    method: 'POST',
    controller: 'users',
    action: 'logout',
    options: { withCredentials: true },
  }, showToast);

  if (!response) return;

  store.dispatch(clearJwt());

  navigate('/');
}

export {
  login,
  logout,
  register,
};
