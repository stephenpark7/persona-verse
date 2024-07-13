import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

class User extends Model {
  getId(): number {
    return this.getDataValue('id')
  }

  getPassword(): string {
    return this.getDataValue('password');
  }

  static initModel() {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, { sequelize });
  }
}

export default User;
