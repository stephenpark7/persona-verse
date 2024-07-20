import { DataTypes, Sequelize } from 'sequelize';

const RefreshToken = (sequelize: Sequelize) => {
  return sequelize.define('RefreshToken', {
    jti: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  });
};

export {
  RefreshToken,
};
