import { DataTypes, Model, ModelStatic, Sequelize } from 'sequelize';

class RefreshToken extends Model {
  static model: ModelStatic<Model>;

  static definition = {
    jti: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  };

  static initModel(sequelize: Sequelize): ModelStatic<Model> {
    return sequelize.define('RefreshToken', RefreshToken.definition);
  }
}

export {
  RefreshToken,
};
