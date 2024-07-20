import { DataTypes, Sequelize } from 'sequelize';

const RevokedToken = (sequelize: Sequelize) => {
  return sequelize.define('RevokedToken', {
    jti: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  });
};

export {
  RevokedToken,
};
