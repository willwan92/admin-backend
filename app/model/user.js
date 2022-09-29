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

  User.sync().then(async () => {
    const user = await User.findOne({
      where: {
        username: 'admin',
      },
    });

    if (!user) {
      User.create({
        username: 'admin',
        password: 'd4c801748bd16babb2921663777fc305',
      });
    }
  });

  return User;
};
