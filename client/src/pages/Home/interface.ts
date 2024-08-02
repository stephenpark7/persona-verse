import { JWT } from '../../../src/interfaces';

export interface HomeProps {
  jwt: JWT | null;
  isLoggedIn: boolean;
};
