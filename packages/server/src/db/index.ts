import { sequelize } from './sequelize';
import { 
  User, 
  Tweet, 
  RevokedToken, 
  RefreshToken, 
  UserProfile, 
} from '../models';
import { setupDatabase } from './setupDatabase';

const db = (() => {
  const models = {
    User,
    Tweet,
    RevokedToken,
    RefreshToken,
    UserProfile,
  };

  return {
    sequelize,
    setupDatabase,
    models,
  };
})();

export { db };
