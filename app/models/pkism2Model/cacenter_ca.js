'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Cacenter_ca = app.pkism2Model.define(
    'cacenter_ca',
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
      timestamps: false,
    }
  );

  Cacenter_ca.sync();

  return Cacenter_ca;
};
