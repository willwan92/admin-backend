'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Ocspconf = app.pkiModel.define(
    'ocspconf',
    {
        ip: {
        type: STRING(32),
        primaryKey: true,
        allowNull: false,
        },
        port: {
        type: STRING(8),
        allowNull: true,
        },
        timeout: {
        type: INTEGER,
        allowNull: true,
        },
        ca_cert: {
        type: STRING(80),
        allowNull: true,
        },
        
    },
    {
        tableName: 'ocsp_conf',
        timestamps: false,
    }
  );

  Ocspconf.sync({ alter: true });
  //const ocsp = Ocspconf.build(
  //  {ip:'1.1.1.1',port:'',timeout:0,ca_cert:''}
 // );
  //ocsp.save();
  return Ocspconf;
};