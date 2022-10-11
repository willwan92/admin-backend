/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = () => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.sequelize = {
    dialect: 'sqlite',
    storage: '/usr/local/conf/admin_default.db',
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
        enable: true,
        headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
        cookieName: 'CSRFTOKEN', // Cookie 中的字段名，默认为 csrfToken
      },
    },
  };
};
