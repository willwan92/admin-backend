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
      },
      {
        dialect: 'sqlite',
        delegate: 'logModel',
        baseDir: 'logModel',
      },
      {
        dialect: 'sqlite',
        delegate: 'ipencModel',
        baseDir: 'ipencModel',
      },
    ]
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
