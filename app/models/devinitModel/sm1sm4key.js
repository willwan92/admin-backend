'use strict';

module.exports = async (app) => {
  const { STRING } = app.Sequelize;
  const Sm1sm4key = app.devinitModel.define(
    'Sm1sm4key',
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
      tableName: 'sm1sm4key',
      timestamps: false,
    }
  );

  await Sm1sm4key.sync();

  return Sm1sm4key;
};
