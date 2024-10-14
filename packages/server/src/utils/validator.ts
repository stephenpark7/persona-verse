import validator from 'validator';
import * as models from '@models';

const validateUsername = (username: string): boolean => {
  return validator.isAlphanumeric(username);
};

const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

const validatePassword = (password: string): boolean => {
  return validator.isStrongPassword(password);
};

const usernameAlreadyExists = async (username: string): Promise<boolean> => {
  const user = await models.User.findOne({ where: { username: username } });
  return user != null;
};

const emailAlreadyExists = async (email: string): Promise<boolean> => {
  const user = await models.User.findOne({ where: { email: email } });
  return user != null;
};

const missingFields = (...fields: string[]): boolean => {
  return fields.some(
    (field) => field === undefined || field === null || field?.length === 0,
  );
};

export const validateCreate = async (
  username: string,
  email: string,
  password: string,
): Promise<boolean> => {
  if (missingFields(username, email, password)) {
    throw new Error('Missing field(s).');
  }

  if (!validateUsername(username)) {
    throw new Error('Invalid username.');
  }

  if (!validateEmail(email)) {
    throw new Error('Invalid email address.');
  }

  if (!validatePassword(password)) {
    throw new Error(
      'Invalid password. Please enter a password that is at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.',
    );
  }

  if (await usernameAlreadyExists(username)) {
    throw new Error('Username already in use.');
  }

  if (await emailAlreadyExists(email)) {
    throw new Error('Email address already in use.');
  }

  return true;
};

export const validateLogin = async (
  username: string,
  password: string,
): Promise<InstanceType<typeof models.User> | null> => {
  if (missingFields(username, password)) {
    throw new Error('Missing field(s).');
  }

  const user = await models.User.findOne({ where: { username } });

  return user;
};
