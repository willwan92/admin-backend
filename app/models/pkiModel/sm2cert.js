'use strict';

module.exports = async (app) => {
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
        allowNull:true,
        },
        issuer: {
        type: STRING(256),
        allowNull: true,
        },
        subject: {
        type: STRING(32),
        allowNull: true,
        },
        cn: {
        type: STRING(32),
        allowNull: true,
        },
        startdate: {
        type: STRING(32),
        allowNull: true,
        },
        enddate: {
        type: STRING(64),
        allowNull: true,
        },
        serial: {
        type: STRING(64),
        allowNull: true,
        },
        method: {
        type: INTEGER,
        allowNull: true,
        },
    },
    {
        tableName: 'pki_cert',
        timestamps: false,
    }
  );

  await Sm2cert.sync();

  return Sm2cert;
};