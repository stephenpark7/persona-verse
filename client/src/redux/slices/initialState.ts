import { State } from '../../interfaces/user';
import { JwtStorage } from '../../utils/jwtStorage.util';

const initialState: State = {
  value: {
    jwt: JwtStorage.getAccessToken(),
    tweets: null,
  },
};

export { initialState };
