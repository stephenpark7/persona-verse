import validator from 'validator';
import * as models from '@db/models';

export const validateUsername = (username: string): boolean => {
  return validator.isAlphanumeric(username);
};

export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

export const validateUserPassword = (password: string): boolean => {
  return validator.isStrongPassword(password);
};

export const usernameAlreadyExists = async (
  username: string,
): Promise<boolean> => {
  const user = await models.User.findOne({ where: { username: username } });
  return user !== null;
};

export const emailAlreadyExists = async (email: string): Promise<boolean> => {
  const user = await models.User.findOne({ where: { email: email } });
  return user !== null;
};

export const isMissingFields = (...fields: string[]): boolean => {
  return fields.some(
    (field) => field === undefined || field === null || field?.length === 0,
  );
};
