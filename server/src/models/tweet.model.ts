import { Model } from 'sequelize';
import User from './user.model';
// import { sequelize } from './index';

// const Tweet = {};

// const Tweet = sequelize.define('Tweet', {
//   message: Sequelize.STRING,
//   likes: Sequelize.INTEGER,
// });

interface TweetAttributes {
  UserId: number;
  id?: number;
  message: string;
  likes: number;
}

class Tweet extends Model<TweetAttributes> implements TweetAttributes {
  public UserId!: number;
  public id!: number;
  public message!: string;
  public likes!: number;
}

export default Tweet;
