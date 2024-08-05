import { DataTypes, Model, ModelStatic, Sequelize } from 'sequelize';

class UserProfile extends Model {
  static model: ModelStatic<Model>;

  static definition = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };

  static initModel(sequelize: Sequelize): ModelStatic<Model> {
    return sequelize.define('UserProfile', UserProfile.definition);
  }
}

export { UserProfile };
