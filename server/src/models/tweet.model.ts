import { DataTypes, Model, ModelStatic, Sequelize } from 'sequelize';

class Tweet extends Model {
  static definition = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  };

  static initModel(sequelize: Sequelize): ModelStatic<Model> {
    return sequelize.define('Tweet', Tweet.definition);
  }
}

export { Tweet };
