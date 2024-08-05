import { NavigateFunction } from 'react-router-dom';
import { RegisterFunction, RegisterParams, LoginParams, LoginFunction } from '../interfaces';
import { apiCall } from './';
import { setJwt, clearJwt } from '../redux/actions';
import { store } from '../redux/stores';

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
  }, showToast);

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
  }, showToast);

  if (!response) return;

  if (!response.jwt) {
    throw new Error('JWT data is missing.');
  }

  store.dispatch(setJwt(response.jwt));

  navigate('/'); 
};

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
