import { User } from './user.model';
import { Tweet } from './tweet.model';
import { RevokedToken } from './revokedToken.model';
import { RefreshToken } from './refreshToken.model';
import { UserProfile } from './userProfile.model';

User.hasMany(Tweet);
User.hasMany(RevokedToken);
User.hasMany(RefreshToken);
User.hasOne(UserProfile);

Tweet.belongsTo(User);
RevokedToken.belongsTo(User);
RefreshToken.belongsTo(User);
UserProfile.belongsTo(User);
