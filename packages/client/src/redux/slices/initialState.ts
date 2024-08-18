import { State } from '@interfaces';
import { tokenStorage } from '@utils';

const initialState: State = {
  value: {
    jwt: tokenStorage.getAccessToken(),
    tweets: null,
  },
};

export { initialState };
