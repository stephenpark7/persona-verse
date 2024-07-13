import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

class RevokedToken extends Model {
  getJti(): number {
    return this.getDataValue('jti')
  }

  static initModel() {
    RevokedToken.init({
      jti: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
    }, { sequelize });
  }
}

export default RevokedToken;
