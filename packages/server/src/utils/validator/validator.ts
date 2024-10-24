import {
  emailAlreadyExists,
  usernameAlreadyExists,
  isMissingFields,
  validateUsername,
  validateEmail,
  validateUserPassword,
} from './base';

enum ValidationError {
  MISSING_FIELDS = 'Missing field(s).',
  INVALID_USERNAME = 'Invalid username.',
  INVALID_EMAIL = 'Invalid email address.',
  INVALID_PASSWORD = 'Invalid password. Please enter a password that is at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.',
  USERNAME_EXISTS = 'Username already in use.',
  EMAIL_EXISTS = 'Email address already in use.',
}

export const validateUserCreate = async (
  username: string,
  email: string,
  password: string,
): Promise<string | null> => {
  const error: ValidationError | null = await getValidationError(
    username,
    email,
    password,
  );

  return error ? error : null;
};

export const validateUserLogin = async (
  username: string,
  password: string,
): Promise<string | null> => {
  if (isMissingFields(username, password)) {
    return ValidationError.MISSING_FIELDS;
  }
  return null;
};

const getValidationError = async (
  username: string,
  email: string,
  password: string,
): Promise<ValidationError | null> => {
  if (isMissingFields(username, email, password)) {
    return ValidationError.MISSING_FIELDS;
  } else if (!validateUsername(username)) {
    return ValidationError.INVALID_USERNAME;
  } else if (!validateEmail(email)) {
    return ValidationError.INVALID_EMAIL;
  } else if (!validateUserPassword(password)) {
    return ValidationError.INVALID_PASSWORD;
  } else if (await usernameAlreadyExists(username)) {
    return ValidationError.USERNAME_EXISTS;
  } else if (await emailAlreadyExists(email)) {
    return ValidationError.EMAIL_EXISTS;
  }
  return null;
};
