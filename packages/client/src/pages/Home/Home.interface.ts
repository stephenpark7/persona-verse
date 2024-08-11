import { JWT } from 'shared/types';

export interface HomeProps {
  jwt: JWT | null;
  isLoggedIn: boolean;
};
