import { DataTypes, Model, Sequelize } from 'sequelize';

export class User extends Model {
  public static initModel(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
      },
    );
  }
}
