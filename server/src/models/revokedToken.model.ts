import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

class RevokedToken extends Model {
  getJti(): number {
    return this.getDataValue('jti')
  }

  static initModel() {
    RevokedToken.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    }, { sequelize });
  }
}

export default RevokedToken;
