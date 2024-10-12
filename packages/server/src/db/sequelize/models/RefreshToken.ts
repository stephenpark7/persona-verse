import { DataTypes, Model, Sequelize } from 'sequelize';

export class RefreshToken extends Model {
  public static initModel(sequelize: Sequelize) {
    return super.init(
      {
        jti: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
      },
      {
        sequelize,
        modelName: 'RefreshToken',
      },
    );
  }
}
