import validator from 'validator';
import { db } from '../db';

const { models } = db;
const { User } = models;

export const validateUsername = (username: string): boolean => {
  return validator.isAlphanumeric(username);
};

export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

export const validatePassword = (password: string): boolean => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return validator.isStrongPassword(password);
};

export const usernameAlreadyExists = async (username: string): Promise<boolean> => {
  return await User.findOne({ where: { username: username } }) != null;
};

export const emailAlreadyExists = async (email: string): Promise<boolean> => {
  return await User.findOne({ where: { email: email } }) != null;
};

export const missingFields = (...fields: string[]): boolean => {
  return fields.some(field => field === undefined || field === null || field?.length === 0);
};
