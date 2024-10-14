import { User } from '@models';
import { compare } from './base';

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
