import { User } from '@db/models';
import { user, User as UserParams } from '@schemas';

export const userFactory = async (
  params: UserParams = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password',
  },
) => {
  user.parse(params);
  return (await User.create(params)).get();
};
