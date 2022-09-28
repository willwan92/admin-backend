/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    swaggerdoc: {
      dirScanner: './app/controller',
      apiInfo: {
        title: '管理后台接⼝',
        description: '管理后台接⼝ swagger-ui for egg',
        version: '0.0.1',
      },
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      enableSecurity: false,
      // enableValidate: true,
      routerMap: true,
      enable: true,
    },
    jwt: {
      secret: 'willwan92',
    },
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1625726121147_1965';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'admin_default',
    username: 'root',
    password: '123456',
  };

  config.cluster = {
    listen: {
      port: 7002,
      hostname: '127.0.0.1',
    },
  };

  return {
    ...config,
    ...userConfig,
    security: {
      csrf: {
        enable: false,
      },
    },
  };
};
