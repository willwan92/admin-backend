'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  // 模型若为下划线方式命名会自动转为大驼峰命名，使用模型时注意要使用对应的大驼峰命名
  const adminip = app.ipencModel.define('adminip', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ip: {
      type: STRING(39),
      allowNull: false,
    },
    comment: {
      type: STRING(255),
    },
    vsysid: {
      type: INTEGER,
    },
  });

  adminip.sync();

  return adminip;
};
