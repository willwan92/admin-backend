'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Pkicert = app.pkiModel.define(
    'pkicert',
    {
        name: {
        type: STRING(32),
        allowNull: false,
        },
        version: {
        type: STRING(128),
        allowNull: false,
        },
        serial: {
        type: STRING(128),
        allowNull: false,
        },
        issuer: {
        type: STRING(256),
        allowNull: false,
        },
        subject: {
        type: STRING(256),
        allowNull: false,
        },
        pubkey_alg: {
        type: STRING(128),
        allowNull: false,
        },
        modulus: {
        type: STRING(1025),
        allowNull: false,
        },
        sign_alg: {
        type: STRING(128),
        allowNull: false,
        },
        startdate: {
        type: STRING(128),
        allowNull: false,
        },
        enddate: {
        type: STRING(128),
        allowNull: false,
        },
    },
    {
        tableName: 'cacenter_ca',
        timestamps: false,
    }
  );

  Pkicert.sync({ alter: true });

  return Pkicert;
};
