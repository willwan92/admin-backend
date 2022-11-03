/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = () => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.sequelize = {
    datasources: [
      {
        dialect: 'sqlite',
        storage: '/usr/local/conf/admin_default.db',
      },
      {
        dialect: 'sqlite',
        delegate: 'logModel',
        baseDir: 'logModel',
        storage: '/usr/local/conf/logs.db',
      },
      {
        dialect: 'sqlite',
        delegate: 'ipencModel',
        baseDir: 'ipencModel',
        storage: '/usr/local/conf/ipenc.db',
      },
      {
        dialect: 'sqlite',
        delegate: 'configModel',
        baseDir: '../app/models/configModel',
        storage: '/usr/local/conf/configs.db',
      },
    ]
  };

  config.cluster = {
    listen: {
      port: 7002,
      hostname: '100.100.100.251',
    },
  };

  return {
    ...config,
    security: {
      csrf: {
        enable: false,
        headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
        cookieName: 'CSRFTOKEN', // Cookie 中的字段名，默认为 csrfToken
      },
    },
  };
};
