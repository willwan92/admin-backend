'use strict';

module.exports = (app) => {
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

  Sm2key.sync();

  return Sm2key;
};
