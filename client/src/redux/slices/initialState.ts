import { State } from '../../interfaces';
import { JwtStorage } from '../../utils/jwtStorage.util';

const initialState: State = {
  value: {
    jwt: JwtStorage.getAccessToken(),
    tweets: null,
  },
};

export { initialState };
