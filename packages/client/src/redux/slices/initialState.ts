import { State } from '@interfaces/index';
import { tokenStorage } from '@utils/index';

const initialState: State = {
  value: {
    jwt: tokenStorage.getAccessToken(),
    tweets: null,
  },
};

export { initialState };
