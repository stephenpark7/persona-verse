import { User } from '@models';
import { User as UserParams } from '@schemas';

export const userFactory = async (
  params: UserParams = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password',
  },
) => {
  const user = await User.create(params);
  return user;
};
