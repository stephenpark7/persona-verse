import { DataTypes, Model, Sequelize } from 'sequelize';

export class UserProfile extends Model {
  public static initModel(sequelize: Sequelize) {
    return super.init(
      {
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
      },
      {
        sequelize,
        modelName: 'UserProfile',
      },
    );
  }
}
