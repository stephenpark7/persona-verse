import { sequelize } from './sequelize';
import Models from '../models';
// import { ModelDefinitions } from '../interfaces';

// const models = {
//   User: User.initModel(sequelize),
//   Tweet: Tweet.initModel(sequelize),
//   RevokedToken: RevokedToken.initModel(sequelize),
//   RefreshToken: RefreshToken.initModel(sequelize),
// } as ModelDefinitions;

const db = (() => {
  const User = Models.User.initModel(sequelize);
  const Tweet = Models.Tweet.initModel(sequelize);
  const RevokedToken = Models.RevokedToken.initModel(sequelize);
  const RefreshToken = Models.RefreshToken.initModel(sequelize);

  async function setupDB(): Promise<void> {
    await sequelize.authenticate();

    User.hasMany(Tweet);
    User.hasMany(RevokedToken);
    User.hasMany(RevokedToken);
  
    Tweet.belongsTo(User);
    RevokedToken.belongsTo(User);
    RefreshToken.belongsTo(User);
  
    await syncDB();
  }
  
  const models = (() => {
    return {
      User,
      Tweet,
      RevokedToken,
      RefreshToken,
    };
  })();
  
  async function syncDB(): Promise<void> {
    if (process.env.NODE_ENV === 'test') {
      await sequelize.sync({ force: true });
      return;
    }
    
    await sequelize.sync();
  }

  return {
    sequelize,
    setupDB,
    models,
  };
})();

export default db;
