import { userReducer } from './userSlice';
import { initialState } from './initialState';

const rootReducer = {
  user: userReducer,
};

export { rootReducer, initialState };
