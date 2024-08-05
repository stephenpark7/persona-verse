import { DataTypes, Model, ModelStatic, Sequelize } from 'sequelize';

class RevokedToken extends Model {
  static model: ModelStatic<Model>;

  static definition = {
    jti: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  };

  static initModel(sequelize: Sequelize): ModelStatic<Model> {
    return sequelize.define('RevokedToken', RevokedToken.definition);
  }
}

export { RevokedToken };
