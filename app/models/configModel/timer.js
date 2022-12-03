'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Timer = app.configModel.define(
    'timer',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      server: {
        type: STRING(128),
        allowNull: false,
      },
      period: {
        type: INTEGER,
        allowNull: false,
      },
      start: {
        type: INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'timer',
      timestamps: false,
    }
  );

  Timer.sync().then(async () => {
    const mtimer = await Timer.findOne({
      where: {
        id: 1,
      },
    });

    if (!mtimer) {
      await Timer.create({
        server: '1.1.1.1',
        period: 60,
        start: 0,
      });
    }
  });

  return Timer;
};
