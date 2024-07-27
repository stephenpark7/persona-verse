import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  JWT,
  RequestBody,
} from '../interfaces';
import { apiCall, handleError } from './index';
import { store, set, clear, clearUserData } from '../stores/';

async function register(
  formData: RequestBody,
  navigate: NavigateFunction,
  showToast: boolean = true,
  autoLogin: boolean = true,
): Promise<void> {
  try {
    const responseData = await apiCall('POST', 'users', 'signup', formData);

    if (showToast) {
      toast.success(responseData.message);
    }

    if (autoLogin) {
      await login(formData, navigate, false);
    }
  } catch (err) {
    handleError(err, 5000);
  }
}

async function login(formData: RequestBody, navigate: NavigateFunction, showToast: boolean = true): Promise<void> {
  try {
    const responseData = await apiCall('POST', 'users', 'login', formData, { credentials: 'include' });

    localStorage.setItem('token', JSON.stringify(responseData.user));
    store.dispatch(set(responseData.user));

    if (showToast) {
      toast.success(responseData.message);
    }

    navigate('/');
  } catch (err) {
    handleError(err);
  }
}

async function logout(
  jwt: JWT,
  navigate: NavigateFunction,
  showToast: boolean = true,
): Promise<void> {
  try {
    const responseData = await apiCall('POST', 'users', 'logout', null, { credentials: 'include' });

    clearUserData();

    if (showToast) {
      toast.success(responseData.message);
    }

    navigate('/');
  } catch (err) {
    handleError(err);
  }
}

export {
  login,
  logout,
  register,
};
