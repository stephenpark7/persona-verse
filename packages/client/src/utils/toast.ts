import { toast } from 'react-toastify';

export type ApiError = Error | { response?: { data?: unknown } } | unknown;

export const displayErrorMessage = (
  err: ApiError,
  autoClose?: number,
): string => {
  let message = 'An unexpected error occurred.';

  if (err instanceof Error) {
    message = err.message;
  } else if (isApiErrorWithResponse(err)) {
    if (err.response?.data) {
      message = err.response.data as string;
    }
  }

  toast.error(message, { autoClose });
  return message;
};

const isApiErrorWithResponse = (
  err: unknown,
): err is { response: { data?: unknown } } => {
  return !!err && typeof err === 'object' && 'response' in err;
};

export const displaySuccessMessage = (
  message: string,
  autoClose?: number,
): void => {
  toast.success(message, { autoClose });
};
