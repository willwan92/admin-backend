'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Adminip = app.configModel.define(
    'adminip',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ip: {
        type: STRING(39),
        unique: true,
        allowNull: false,
      },
      comment: {
        type: STRING(255),
      },
      vsysid: {
        type: INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );

  Adminip.sync({ alter: true });

  return Adminip;
};
