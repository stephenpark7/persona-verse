import { sequelize, setupDB } from '../../src/models';

export const setup_db = async () => {
  await setupDB(sequelize);
};

// import { Sequelize, DataTypes } from 'sequelize';

// import { sequelizeOptions } from '../../src/models';

// export const setup_db = async () => {
//   const sequelizeContext = new Sequelize({
//     ...sequelizeOptions,
//   });

//   await sequelizeContext.authenticate();

//   const Table1 = sequelizeContext.define(
//     'table1',
//     {
//       fieldName_1: {
//         type: DataTypes.STRING,
//       },
//     },
//     { tableName: 'table1' },
//   );

//   const Table2 = sequelizeContext.define(
//     'table2',
//     {
//       fieldName_1: {
//         type: DataTypes.STRING,
//       },
//     },
//     { tableName: 'table2' },
//   );

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   (Table1 as any).hasMany(Table2);

//   await Table1.sync();
//   await Table2.sync();
// };
