import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

class Tweet extends Model {
  static initModel() {
    Tweet.init({
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
      UserId: ''
    }, {
      sequelize,
    });
  }
}

export default Tweet;
