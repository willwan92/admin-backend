'use strict';

module.exports = (app) => {
  const { STRING } = app.Sequelize;
  const Mngcardinit = app.devinitModel.define(
    'SmMngcardinit',
    {
      name: {
        type: STRING(32),
        primaryKey: true,
      },
      usrtype: {
        type: STRING(32),
      },
      keyser: {
        type: STRING(32),
      },
      phone: {
        type: STRING(16),
      },
      login: {
        type: STRING(32),
      },
    },
    {
      tableName: 'mngcardinit',
      timestamps: false,
    }
  );

  Mngcardinit.sync({ alter: true });

  return Mngcardinit;
};
