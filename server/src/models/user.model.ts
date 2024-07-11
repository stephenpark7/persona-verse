import { DataTypes, Model } from 'sequelize';

interface UserAttributes {
  id?: number;
  username?: string;
  displayName?: string;
  email?: string;
  password?: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public displayName!: string;
  public email?: string;
  public password?: string;
}

// User.init({
//   username: DataTypes.STRING,
//   displayName: DataTypes.STRING,
//   email: DataTypes.STRING,
//   password: DataTypes.STRING,
// }, {
//   sequelize,
//   modelName: 'User'
// });

export default User;
