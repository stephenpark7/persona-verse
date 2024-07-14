import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

class RefreshToken extends Model {
  static initModel() {
    RefreshToken.init({
      jti: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    }, { sequelize });
  }

  public getJti(): string {
    return this.getDataValue('jti')
  }
}

export default RefreshToken;
