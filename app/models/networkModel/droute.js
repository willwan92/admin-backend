'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Droute = app.networkModel.define(
    'droute',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ip: {
        type: STRING(39),
        unique: true,
        allowNull: false,
      },
      mask: {
        type: STRING(39),
        allowNull: false,
      },
      gwip: {
        type: STRING(39),
        allowNull: false,
      },
      metric: {
        type: INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );

  Droute.sync();

  return Droute;
};
