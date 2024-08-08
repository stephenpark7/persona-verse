import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequelize';

export class RefreshToken extends Model {}

RefreshToken.init({
  jti: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'RefreshToken',
});
