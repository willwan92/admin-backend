'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Whitelist = app.configModel.define(
    'whitelist',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: INTEGER,
        allowNull: false,
      },
      ip: {
        type: STRING(128),
        unique: true,
        allowNull: false,
      },
      port: {
        type: INTEGER,
        allowNull: false,
      },
      protocol: {
        type: STRING(32),
      },
      comment: {
        type: STRING(255),
      },
      vsysid: {
        type: INTEGER,
      },
    },
    {
      tableName: 'whitelist',
      timestamps: false,
    }
  );

  Whitelist.sync({ alter: true });

  return Whitelist;
};
