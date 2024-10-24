import { User } from '@db/models';
import { compare, hash } from './base';

export const validatePassword = async (
  user: User,
  password: string,
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
