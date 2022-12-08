'use strict';

module.exports = (app) => {
  const { INTEGER } = app.Sequelize;
  const Timeout = app.configModel.define(
    'timeout',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
      },
      timeout: {
        type: INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'timeout',
      timestamps: false,
    }
  );

  Timeout.sync().then(async () => {
    const timeout = await Timeout.findAll();

    if (!timeout.length) {
      await Timeout.create({
        id: 1,
        timeout: 10,
      });
    }
  });

  return Timeout;
};
