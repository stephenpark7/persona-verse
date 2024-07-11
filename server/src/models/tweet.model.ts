import { DataTypes, Model, ModelAttributeColumnOptions } from 'sequelize';
import { sequelize, User } from '.';

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

  constructor() {
    super();

    this.messageOptions = {
      type: DataTypes.STRING,
      allowNull: false,
    };

    this.likesOptions = {
      type: DataTypes.INTEGER,
      allowNull: false,
    };

    this.createdAtOptions = {
      type: DataTypes.DATE,
      allowNull: false,
    };

    this.UserIdOptions = {
      type: DataTypes.INTEGER,
      allowNull: false,
    };

    Tweet.init({
      id: this.idOptions,
      message: this.messageOptions,
      likes: this.likesOptions,
      createdAt: this.createdAtOptions,
      UserId: this.UserIdOptions,
    }, { sequelize });

    Tweet.belongsTo(User);
  }
}

export default Tweet;
