import { setup_db } from './';
import { Sequelize } from 'sequelize';
import { mocked } from 'jest-mock';

// jest.mock('sequelize', () => {
//   const mSequelize = {
//     authenticate: jest.fn(),
//     define: jest.fn(),
//   };
//   const actualSequelize = jest.requireActual('sequelize');
//   return { Sequelize: jest.fn(() => mSequelize), DataTypes: actualSequelize.DataTypes };
// });

// const mSequelizeContext = new Sequelize();

describe('setup_db', () => {
  // afterAll(() => {
  //   jest.resetAllMocks();
  // });
  it('should setup db correctly', async () => {
    // const mTable1 = { hasMany: jest.fn(), sync: jest.fn() };
    // const mTable2 = { sync: jest.fn() };
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // mocked(mSequelizeContext.define).mockImplementation((modelName): any => {
    //   switch (modelName) {
    //     case 'table1':
    //       return mTable1;
    //     case 'table2':
    //       return mTable2;
    //   }
    // });
    await setup_db();
    // expect(Sequelize).toHaveBeenCalledWith({ 
    //   database: 'test_db',
    //   username: 'test_user',
    //   password: 'test_password',
    //   host: 'localhost',
    //   port: 5432,
    //   dialect: 'postgres',
    //   pool: {
    //     max: 5,
    //     min: 0,
    //     idle: 10000,
    //   },
    // });
    // expect(mSequelizeContext.authenticate).toHaveBeenCalled();
    // expect(mSequelizeContext.define).toHaveBeenCalledWith(
    //   'table1',
    //   {
    //     fieldName_1: {
    //       type: DataTypes.STRING,
    //     },
    //   },
    //   { tableName: 'table1' },
    // );
    // expect(mSequelizeContext.define).toHaveBeenCalledWith(
    //   'table2',
    //   {
    //     fieldName_1: {
    //       type: DataTypes.STRING,
    //     },
    //   },
    //   { tableName: 'table2' },
    // );
    // expect(mTable1.hasMany).toHaveBeenCalledWith(mTable2);
    // expect(mTable1.sync).toHaveBeenCalledTimes(1);
    // expect(mTable2.sync).toHaveBeenCalledTimes(1);
  });
});
