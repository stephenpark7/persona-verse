import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

class RevokedToken extends Model {
  // getId(): number {
  //   return this.getDataValue('id')
  // }

  // getPassword(): string {
  //   return this.getDataValue('password');
  // }

  static initModel() {
    RevokedToken.init({
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      
    }, { sequelize });
  }
}

export default RevokedToken;
