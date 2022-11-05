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

  config.sequelize = {
    datasources: [
      {
        dialect: 'sqlite',
        delegate: 'model',
        baseDir: '../app/models/defaultModel',
        storage: '/usr/local/conf/admin_default.db',
      },
      {
        dialect: 'sqlite',
        delegate: 'logModel',
        baseDir: '../app/models/logModel',
        storage: '/usr/local/conf/logs.db',
      },
      {
        dialect: 'sqlite',
        delegate: 'ipencModel',
        baseDir: '../app/models/ipencModel',
        storage: '/usr/local/conf/ipenc.db',
      },
      {
        dialect: 'sqlite',
        delegate: 'configModel',
        baseDir: '../app/models/configModel',
        storage: '/usr/local/conf/configs.db',
      },
      {
        dialect: 'sqlite',
        delegate: 'devinitModel',
        baseDir: '../app/models/devinitModel',
        storage: '/usr/local/conf/devinit.db',
      },
    ],
  };

  // 注意，开启此模式后，应用就默认自己处于反向代理之后，
  // 会支持通过解析约定的请求头来获取用户真实的 IP，协议和域名。
  // 如果你的服务未部署在反向代理之后，请不要开启此配置，以防被恶意用户伪造请求 IP 等信息。
  config.proxy = true;

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
