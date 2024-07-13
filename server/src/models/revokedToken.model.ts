import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

class RevokedToken extends Model {
  static initModel() {
    RevokedToken.init({
      jti: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    }, { sequelize });
  }

  public getJti(): number {
    return this.getDataValue('jti')
  }
}

export default RevokedToken;
