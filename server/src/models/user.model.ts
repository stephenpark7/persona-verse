import { DataTypes, Model, ModelStatic, Sequelize } from 'sequelize';

class User extends Model {
  static model: ModelStatic<Model>;

  static definition = {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  static initModel(sequelize: Sequelize): ModelStatic<Model> {
    return sequelize.define('User', User.definition);
  }
}

export {
  User,
};
