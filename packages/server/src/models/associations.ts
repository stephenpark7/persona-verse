import { User } from './User';
import { Tweet } from './Tweet';
import { RevokedToken } from './RevokedToken';
import { RefreshToken } from './RefreshToken';
import { UserProfile } from './UserProfile';

User.hasMany(Tweet);
User.hasMany(RevokedToken);
User.hasMany(RefreshToken);
User.hasOne(UserProfile);

Tweet.belongsTo(User);
RevokedToken.belongsTo(User);
RefreshToken.belongsTo(User);
UserProfile.belongsTo(User);
