'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Updatehis = app.sysupdateModel.define(
    'updatehis',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      time: {
        type: STRING(32),
        allowNull: false,
      },
      version: {
        type: STRING(32),
        allowNull: false,
      },
      des: {
        type: STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: 'updatehis',
      timestamps: false,
    }
  );

  Updatehis.sync();

  return Updatehis;
};
