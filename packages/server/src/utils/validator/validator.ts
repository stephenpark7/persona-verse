import {
  emailAlreadyExists,
  usernameAlreadyExists,
  isMissingFields,
  validateUsername,
  validateEmail,
  validateUserPassword,
} from './base';

export const assertValidUserCreate = async (
  username: string,
  email: string,
  password: string,
): Promise<void> => {
  if (isMissingFields(username, email, password)) {
    throw new Error('Missing field(s).');
  }

  if (!validateUsername(username)) {
    throw new Error('Invalid username.');
  }

  if (!validateEmail(email)) {
    throw new Error('Invalid email address.');
  }

  if (!validateUserPassword(password)) {
    throw new Error(
      'Invalid password. Please enter a password that is at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.',
    );
  }

  // TODO: refactor to use Promise.all to check for username and email in parallel OR use a single query to check for both

  if (await usernameAlreadyExists(username)) {
    throw new Error('Username already in use.');
  }

  if (await emailAlreadyExists(email)) {
    throw new Error('Email address already in use.');
  }
};

export const assertValidUserLogin = async (
  username: string,
  password: string,
): Promise<void> => {
  if (isMissingFields(username, password)) {
    throw new Error('Missing field(s).');
  }
};
