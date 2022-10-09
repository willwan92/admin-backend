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
    storage: '../admin_default.db',
  };

  config.cluster = {
    listen: {
      port: 7002,
      hostname: '127.0.0.1',
    },
  };

  return {
    ...config,
    security: {
      csrf: {
        enable: false,
      },
    },
  };
};
