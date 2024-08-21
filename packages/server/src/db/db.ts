
import { sequelize } from './sequelize';
import { setupDatabase } from './setupDatabase';
import { 
  User, 
  Tweet, 
  RevokedToken, 
  RefreshToken, 
  UserProfile, 
} from '@models';

export const db = (() => {
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
