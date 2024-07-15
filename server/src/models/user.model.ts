import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

class User extends Model {
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
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, { sequelize });
  }

  public getId(): number {
    return this.getDataValue('id')
  }

  public getPassword(): string {
    return this.getDataValue('password');
  }

  public getUsername(): string {  
    return this.getDataValue('username');
  }
}

export default User;
