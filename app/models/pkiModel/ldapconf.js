'use strict';

module.exports = async (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const Ldapconf = app.pkiModel.define(
    'ldapconf',
    {
      ldap_server: {
        type: STRING(32),
        primaryKey: true,
        allowNull: false,
      },
      ldap_port: {
        type: STRING(128),
        allowNull: false,
      },
      username: {
        type: STRING(256),
        allowNull: true,
      },
      password: {
        type: STRING(32),
        allowNull: true,
      },
      object: {
        type: STRING(32),
        allowNull: true,
      },
      attribute: {
        type: STRING(64),
        allowNull: true,
      },
      sizelimit: {
        type: INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'ldap_conf',
      timestamps: false,
    }
  );

  await Ldapconf.sync();
  //const ldap = Ldapconf.build(
  //  {ldap_server:'1.1.1.1',ldap_port:'389',username:'',password:'',object:'',attribute:'',sizelimit:0}
  // );
  //ldap.save();
  return Ldapconf;
};
