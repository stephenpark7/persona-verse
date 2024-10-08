import { User, Tweet, RevokedToken, RefreshToken, UserProfile } from '@models';
import { sequelize } from './sequelize';
import { setupDatabase } from './setupDatabase';

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
