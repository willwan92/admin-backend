'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Fwips = app.networkModel.define(
    'fwips',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
      },
      interface: {
        type: STRING(32),
        allowNull: false,
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
      active: {
        type: INTEGER,
      },
      ping: {
        type: INTEGER,
      },
      admin: {
        type: INTEGER,
      },
    },
    {
      tableName: 'fwips',
      timestamps: false,
    }
  );

  Fwips.sync();

  return Fwips;
};
