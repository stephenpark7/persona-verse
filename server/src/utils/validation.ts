import validator from 'validator';
import { User } from '../models';

export function validateUsername(username: string): boolean {
  return validator.isAlphanumeric(username);
}

export function validateEmail(email: string): boolean {
  return validator.isEmail(email);
}

export function validatePassword(password: string): boolean {
  return validator.isStrongPassword(password);
}

export async function usernameAlreadyExists(username: string): Promise<boolean> {
  return await User.findOne({ where: { username: username } }) !== null;
}

export function missingFields(...fields: string[]): boolean {
  return fields.some(field => field === undefined || field?.length === 0);
}
