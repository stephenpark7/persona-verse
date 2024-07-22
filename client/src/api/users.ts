import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FormData,
  SetUserData,
} from '../interfaces';
import { apiCall, handleError } from './index';

async function register(
  formData: FormData,
  setUserData: SetUserData,
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
      await login(formData, setUserData, navigate, false);
    }
  } catch (err) {
    handleError(err, 5000);
  }
}

async function login(formData: FormData, setUserData: SetUserData, navigate: NavigateFunction, showToast: boolean = true): Promise<void> {
  try {
    const responseData = await apiCall('POST', 'users', 'login', formData, { credentials: 'include' });

    localStorage.setItem('token', JSON.stringify(responseData.user));
    setUserData(responseData.user);

    if (showToast) {
      toast.success(responseData.message);
    }

    navigate('/');
  } catch (err) {
    handleError(err);
  }
}

async function logout(
  setUserData: SetUserData,
  navigate: NavigateFunction,
  showToast: boolean = true,
): Promise<void> {
  try {
    const responseData = await apiCall('POST', 'users', 'logout', null, { credentials: 'include' });

    localStorage.removeItem('token');
    setUserData(null);

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
