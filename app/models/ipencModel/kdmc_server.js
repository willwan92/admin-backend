'use strict';

module.exports = async (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  // 模型若为下划线方式命名会自动转为大驼峰命名，使用模型时注意要使用对应的大驼峰命名
  const KdmcServer = app.ipencModel.define('kdmc_server', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

  await KdmcServer.sync();

  return KdmcServer;
};
