import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export class RevokedToken extends Model {
  public static async isRevoked(jti: string): Promise<boolean> {
    const revokedToken = await RevokedToken.findByPk(jti);
    return revokedToken !== null;
  }
}

RevokedToken.init(
  {
    jti: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'RevokedToken',
  },
);
