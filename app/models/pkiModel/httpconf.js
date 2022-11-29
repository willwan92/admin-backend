'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Httpconf = app.pkiModel.define(
    'httpconf',
    {
        name: {
        type: STRING(32),
        primaryKey: true,
        allowNull: false,
        },
        url: {
        type: STRING(256),
        allowNull: false,
        },
        user: {
        type: STRING(80),
        allowNull: false,
        },
        passwd: {
        type: STRING(80),
        allowNull: false,
        },
        
    },
    {
        tableName: 'http_conf',
        timestamps: false,
    }
  );

  Httpconf.sync({ alter: true });

  return Httpconf;
};