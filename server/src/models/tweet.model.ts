import { DataTypes, Model, ModelAttributeColumnOptions } from 'sequelize';
import { sequelize, User } from './index';

interface TweetAttributes {
  id?: number;
  message: string;
  likes: number;
  createdAt?: Date;
  UserId: number;
}

class Tweet extends Model<TweetAttributes> implements TweetAttributes {
  public id!: number;
  public message!: string;
  public likes!: number;
  public createdAt!: Date;
  public UserId!: number;

  public idOptions: ModelAttributeColumnOptions<Tweet> = {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  };

  public messageOptions!: ModelAttributeColumnOptions<Tweet>;
  public likesOptions!: ModelAttributeColumnOptions<Tweet>;
  public createdAtOptions!: ModelAttributeColumnOptions<Tweet>;
  public UserIdOptions!: ModelAttributeColumnOptions<Tweet>;

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
