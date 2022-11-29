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
        allowNull: true,
        },
        issuer: {
        type: STRING(256),
        allowNull: true,
        },
        lastupdate: {
        type: STRING(32),
        allowNull: true,
        },
        nextupdate: {
        type: STRING(32),
        allowNull: true,
        },
        signature: {
        type: STRING(64),
        allowNull: true,
        },
        revoked_num: {
        type: INTEGER,
        allowNull: true,
        },
    },
    {
        tableName: 'cacenter_crl',
        timestamps: false,
    }
  );

  //Crlcert.sync({ alter: true });
  Crlcert.sync({ alter: true }).then(async () => {
    const cert = await Crlcert.findOne({
      where: {
        name: 'cacert',
      },
    });

    if (!cert) {
        Crlcert.create({
        name: 'cacert',
      });
    }
  });

  return Crlcert;
};