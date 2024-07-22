import validator from 'validator';
import db from '../db';

const { models } = db;
const { User } = models;

function validateUsername(username: string): boolean {
  return validator.isAlphanumeric(username);
}

function validateEmail(email: string): boolean {
  return validator.isEmail(email);
}

function validatePassword(password: string): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return validator.isStrongPassword(password);
}

async function usernameAlreadyExists(username: string): Promise<boolean> {
  return await User.findOne({ where: { username: username } }) != null;
}

async function emailAlreadyExists(email: string): Promise<boolean> {
  return await User.findOne({ where: { email: email } }) != null;
}

function missingFields(...fields: string[]): boolean {
  return fields.some(field => field === undefined || field === null || field?.length === 0);
}

export default {
  validateUsername,
  validateEmail,
  validatePassword,
  usernameAlreadyExists,
  emailAlreadyExists,
  missingFields,
};
