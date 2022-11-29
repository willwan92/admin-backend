'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Sm2cert = app.pkiModel.define(
    'sm2cert',
    {
        name: {
        type: STRING(32),
        primaryKey: true,
        allowNull: false,
        },
        type:{
        type:INTEGER,
        allowNull:false,
        },
        issuer: {
        type: STRING(256),
        allowNull: false,
        },
        subject: {
        type: STRING(32),
        allowNull: false,
        },
        cn: {
        type: STRING(32),
        allowNull: false,
        },
        startdate: {
        type: STRING(32),
        allowNull: false,
        },
        enddate: {
        type: STRING(64),
        allowNull: false,
        },
        serial: {
        type: STRING(64),
        allowNull: false,
        },
        method: {
        type: INTEGER,
        allowNull: false,
        },
    },
    {
        tableName: 'pki_cert',
        timestamps: false,
    }
  );

  Sm2cert.sync({ alter: true });

  return Sm2cert;
};