import { RefreshToken } from './RefreshToken';
import { RevokedToken } from './RevokedToken';
import { Tweet } from './Tweet';
import { User } from './User';
import { UserProfile } from './UserProfile';

// Refresh token

RefreshToken.belongsTo(User);

// Revoked token

RevokedToken.belongsTo(User);

// Tweet

Tweet.belongsTo(User);

// User

User.hasMany(Tweet);

User.hasMany(RevokedToken);

User.hasMany(RefreshToken);

User.hasOne(UserProfile);

// UserProfile

UserProfile.belongsTo(User);
