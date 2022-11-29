'use strict';

module.exports = async (app) => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;
  // date varchar(32),type int,pri int,vsysid int,host varchar(64),sip varchar(32),
  // user varchar(32),msg varchar(512)
  const Log = app.logModel.define('log', {
    date:DATE,
    type: {
      type: INTEGER,
      allowNull: false,
    },
    pri: {
      type: INTEGER,
      allowNull: false,
    },
    vsysid: {
      type: INTEGER,
    },
    host: {
      type: STRING(64),
    },
    sip: {
      type: STRING(32)
    },
    user: {
      type: STRING(32),
      allowNull: false,
    },
    msg: {
      type: STRING(512),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
  );

  await Log.sync();

  return Log;
};
