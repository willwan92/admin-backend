'use strict';

module.exports = async (app) => {
  const { STRING } = app.Sequelize;
  const Sm2key = app.devinitModel.define(
    'Sm2key',
    {
      keyindex: {
        type: STRING(32),
        primaryKey: true,
      },
      keytype: {
        type: STRING(32),
      },
    },
    {
      tableName: 'sm2key',
      timestamps: false,
    }
  );

  await Sm2key.sync({ alter: true });

  return Sm2key;
};
