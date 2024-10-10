import { RefreshToken } from './RefreshToken';
import { RevokedToken } from './RevokedToken';
import { Tweet } from './Tweet';
import { User } from './User';
import { UserProfile } from './UserProfile';

RefreshToken.belongsTo(User);

RevokedToken.belongsTo(User);

Tweet.belongsTo(User);

User.hasMany(Tweet);

User.hasMany(RevokedToken);

User.hasMany(RefreshToken);

User.hasOne(UserProfile);

UserProfile.belongsTo(User);
