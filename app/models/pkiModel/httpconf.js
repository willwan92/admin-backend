'use strict';

module.exports = async (app) => {
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
        allowNull: true,
        },
        user: {
        type: STRING(80),
        allowNull: true,
        },
        passwd: {
        type: STRING(80),
        allowNull: true,
        },
        
    },
    {
        tableName: 'http_conf',
        timestamps: false,
    }
  );

  await Httpconf.sync({ alter: true });

  return Httpconf;
};