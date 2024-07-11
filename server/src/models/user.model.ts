import { DataTypes, Model, ModelAttributeColumnOptions } from 'sequelize';
import { sequelize, Tweet } from '.';

interface UserAttributes {
  id?: number;
  username: string;
  displayName: string;
  email?: string;
  password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public displayName!: string;
  public email?: string;
  public password!: string;

  public idOptions: ModelAttributeColumnOptions<User> = {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  };

  public usernameOptions: ModelAttributeColumnOptions<User> = {
    type: DataTypes.STRING,
    allowNull: false,
  };

  public displayNameOptions: ModelAttributeColumnOptions<User> = {
    type: DataTypes.STRING,
    allowNull: false,
  };

  public emailOptions: ModelAttributeColumnOptions<User> = {
    type: DataTypes.STRING,
    allowNull: true,
  };

  public passwordOptions: ModelAttributeColumnOptions<User> = {
    type: DataTypes.STRING,
    allowNull: false,
  };

  constructor() {
    super();

    User.init({
      id: this.idOptions,
      username: this.usernameOptions,
      displayName: this.displayNameOptions,
      email: this.emailOptions,
      password: this.passwordOptions,
    }, { sequelize });

    User.hasMany(Tweet);
  }
}

export default User;
