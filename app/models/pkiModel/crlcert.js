'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Crlcert = app.pkiModel.define(
    'crlcert',
    {
        name: {
        type: STRING(32),
        primaryKey: true,
        allowNull: false,
        },
        version: {
        type: STRING(128),
        allowNull: false,
        },
        issuer: {
        type: STRING(256),
        allowNull: false,
        },
        lastupdate: {
        type: STRING(32),
        allowNull: false,
        },
        nextupdate: {
        type: STRING(32),
        allowNull: false,
        },
        signature: {
        type: STRING(64),
        allowNull: false,
        },
        revoked_num: {
        type: INTEGER,
        allowNull: false,
        },
    },
    {
        tableName: 'cacenter_crl',
        timestamps: false,
    }
  );

  Crlcert.sync({ alter: true });

  return Crlcert;
};