import { RefreshToken } from './RefreshToken';
import { RevokedToken } from './RevokedToken';
import { Tweet } from './Tweet';
import { User } from './User';
import { UserProfile } from './UserProfile';

export const setupAssociations = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    RefreshToken.belongsTo(User);
    RevokedToken.belongsTo(User);
    Tweet.belongsTo(User);
    User.hasMany(Tweet);
    User.hasMany(RevokedToken);
    User.hasMany(RefreshToken);
    User.hasOne(UserProfile);
    UserProfile.belongsTo(User);
    resolve();
  });
};
