import { User } from '@models';
import { compare, hash } from './base';
import { isFalsy } from '../base';

export const validatePassword = async (
  password: string,
  user: User,
): Promise<void> => {
  const isAuthenticated = await compare(
    password,
    user.getDataValue('password'),
  );

  if (!isAuthenticated) {
    throw new Error('Invalid credentials.');
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password);
};
