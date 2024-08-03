import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JsonResponse, Login, RegisterFunction, RegisterParams } from '../../interfaces/api';
import { apiCall, handleError } from '../index';
import { store, setJwt, clearJwt } from '../../stores';

const register: RegisterFunction = async ({
  formData,
  navigate,
  showToast = true,
  autoLogin = true,
}: RegisterParams): Promise<void> => {
  try {
    const responseData = await apiCall({
      method: 'POST',
      controller: 'users',
      action: 'signup',
      body: formData,
    });

    if (showToast) {
      toast.success(responseData.message);
    }

    if (autoLogin) {
      await login({
        formData,
        navigate,
        showToast: false,
      });
    }
  } catch (err) {
    handleError(err, 5000);
  }
};

async function login({
  formData,
  navigate,
  showToast,
}: Login): Promise<void> {
  try {
    const responseData: JsonResponse = await apiCall({
      method: 'POST',
      controller: 'users',
      action: 'login',
      body: formData,
      options: { withCredentials: true },
    });

    if (!responseData.jwt) {
      throw new Error('JWT data is missing.');
    }

    store.dispatch(setJwt(responseData.jwt));

    if (showToast) {
      toast.success(responseData.message);
    }

    navigate('/');
  } catch (err) {
    handleError(err);
  }
}

async function logout(
  navigate: NavigateFunction,
  showToast: boolean = true,
): Promise<void> {
  try {
    const responseData = await apiCall({
      method: 'POST',
      controller: 'users',
      action: 'logout',
      options: { withCredentials: true },
    });

    store.dispatch(clearJwt());

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
