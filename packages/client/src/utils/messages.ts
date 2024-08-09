import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export type ApiError = AxiosError | Error | unknown;

export const displayErrorMessage = (err: ApiError, autoClose?: number): string => {
  let message = 'An unexpected error occurred.';

  if (err instanceof AxiosError) {
    message = err.response?.data.message || err.message;
  }
  else if (err instanceof Error) {
    message = err.message;
  }

  toast.error(message, { autoClose });
  return message;
};

export const displaySuccessMessage = (message: string, autoClose?: number): void => {
  toast.success(message, { autoClose });
};
