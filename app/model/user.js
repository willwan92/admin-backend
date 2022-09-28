'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(32),
    nickname: STRING(32),
    password: STRING(32),
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
