'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: {
      type: STRING(32),
      uiique: true,
      allowNull: false,
    },
    nickname: {
      type: STRING(32),
      uiique: true,
      allowNull: false,
    },
    role: {
      type: ENUM('system', 'business', 'audit'),
      allowNull: false,
      comment: 'system: 系统管理员; business: 业务管理员; audit: 审计管理员',
    },
    phone: {
      type: STRING(11),
    },
    email: {
      type: STRING(64),
    },
    key: {
      type: STRING(32),
      comment: 'key编码',
    },
    gender: {
      type: ENUM('female', 'male', 'other'),
    },
    status: {
      type: ENUM('enable', 'disable'),
      allowNull: false,
      defaultValue: 'enable',
    },
    remarks: {
      type: STRING(128),
      comment: '备注',
    },
    password: STRING(32),
    created_at: DATE,
    updated_at: DATE,
  });

  User.sync({ alter: true }).then(async () => {
    const user = await User.findOne({
      where: {
        username: 'admin',
      },
    });

    if (!user) {
      User.create({
        username: 'admin',
        nickname: '系统管理员',
        role: 'system',
        password: 'd4c801748bd16babb2921663777fc305',
      });
    }
  });

  return User;
};
