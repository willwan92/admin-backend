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
        allowNull: true,
        },
        serial: {
        type: STRING(128),
        allowNull: true,
        },
        issuer: {
        type: STRING(256),
        allowNull: true,
        },
        subject: {
        type: STRING(256),
        allowNull: true,
        },
        pubkey_alg: {
        type: STRING(128),
        allowNull: true,
        },
        modulus: {
        type: STRING(1025),
        allowNull: true,
        },
        sign_alg: {
        type: STRING(128),
        allowNull: true,
        },
        startdate: {
        type: STRING(128),
        allowNull: true,
        },
        enddate: {
        type: STRING(128),
        allowNull: true,
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