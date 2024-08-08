import { JWT } from '../../interfaces';

export interface HomeProps {
  jwt: JWT | null;
  isLoggedIn: boolean;
};
