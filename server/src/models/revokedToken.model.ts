import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequelize';

class RevokedToken extends Model {}

RevokedToken.init({
  jti: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'RevokedToken',
});

export { RevokedToken };
