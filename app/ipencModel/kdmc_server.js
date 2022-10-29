'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const KdmcServer = app.ipencModel.define('kdmc_server', {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    ip: {
      type: STRING(16),
      allowNull: false,
    },
    port: {
      type: INTEGER,
      allowNull: false,
    },
    type: {
      type: INTEGER,
      allowNull: false,
    },
  });

  KdmcServer.sync();

  return KdmcServer;
};
