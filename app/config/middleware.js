'use strict';

// 接口白名单，不需要登录就可以调用
exports.whiteList = ['^/swagger', '/auth/login', '/auth/captcha','^/exportC'];

/**
 * menus：菜单或者功能的接口权限配置。
 * 字段说明：
 *   menu: 必填，菜单或功能名称。
 *   roles: 选填，有子菜单时可不填。有该功能权限的角色。角色说明：default（默认管理员），system（系统管理员），
 *        business（业务管理员），audit（审计管理员），all（所有角色）。
 *   apis: 选填，有子菜单时可不填。该功能包含的API接口，每个API接口包含path和methods两个字段。
 *        path为：必填，接口路径，采用正则匹配。例如：'^/auth' 意为所有以 '/auth' 开头的API接口路径，
 *            '^/users/\\d+'意为以 '/users/用户ID数字' 开头的路径。
 *        methods: 必填，请求方法数组。例如：['get', 'post'] 表示 get 和 post 请求方法，['all'] 表述所有请求方法。
 *
 *   children: 选填，子菜单。
 */
exports.menus = [
  {
    menu: '登录认证',
    roles: ['all'],
    apis: [{ path: '^/auth', methods: ['all'] }],
  },
  {
    menu: '系统首页',
    roles: ['system', 'business', 'audit'],
    apis: [{ path: '^/home', methods: ['all'] }],
  },
  {
    menu: '设备密钥初始化',
    roles: ['default', 'business'],
    apis: [{ path: '^/initKey', methods: ['all'] }],
  },
  {
    menu: 'ECC密钥访问控制码',
    roles: ['business'],
    apis: [{ path: '^/setpin', methods: ['all'] }],
  },
  {
    menu: '网络配置',
    children: [
      {
        menu: '接口IP',
        roles: ['system'],
        apis: [
          { path: '^/ifaddrs', methods: ['all'] },
          { path: '^/interface', methods: ['all'] },
        ],
      },
      {
        menu: '系统路由',
        roles: ['system'],
        apis: [{ path: '^/sysroutes', methods: ['all'] }],
      },
    ],
  },
  {
    menu: '用户管理',
    roles: ['system', 'default'],
    apis: [{ path: '^/users', methods: ['all'] }],
  },
  {
    menu: '单个用户信息',
    roles: ['all'],
    apis: [{ path: '^/users/\\d+', methods: ['get'] }],
  },
  {
    menu: '系统管理',
    children: [
      {
        menu: '时间管理',
        roles: ['system'],
        apis: [
          { path: '^/timeout', methods: ['get', 'put'] },
          { path: '^/timer', methods: ['get', 'put'] },
        ],
      },
      {
        menu: '管理主机',
        roles: ['system'],
        apis: [{ path: '^/adminips', methods: ['all'] }],
      },
      {
        menu: '设备管理',
        roles: ['system'],
        apis: [
          { path: '^/reboots', methods: ['all'] },
          { path: '^/mngcard/checkcard', methods: ['all'] },
        ],
      },
      {
        menu: '系统升级',
        roles: ['system'],
        apis: [
          { path: '^/sysupdates', methods: ['all'] },
          { path: '^/file/upload/PackFile', methods: ['all'] },
        ],
      },
    ],
  },
  {
    menu: '管理卡管理',
    roles: ['business','default'],
    apis: [{ path: '^/mngcard', methods: ['all'] }],
  },
  {
    menu: '服务管理',
    roles: ['business'],
    apis: [{ path: '^/servers', methods: ['all'] }],
  },
  {
    menu: '白名单管理',
    roles: ['business'],
    apis: [{ path: '^/whitelists', methods: ['all'] }],
  },
  {
    menu: '密钥管理',
    roles: ['business'],
    apis: [
      { path: '^/keys', methods: ['all'] },
      { path: '^/keybackup', methods: ['all'] },
    ],
  },
  {
    menu: '证书管理',
    children: [
      {
        menu: '证书初始化',
        roles: ['business'],
        apis: [{ path: '^/initCa', methods: ['all'] }],

      },
      {
        menu: '本地生成私钥和证书',
        roles: ['business'],
        apis: [{ path: '^/createCert', methods: ['all'] }],

      },
      {
        menu: '导入ca证书',
        roles: ['business'],
        apis: [{ path: '^/importCa', methods: ['all'] }],

      },
      {
        menu: '导入sm2证书',
        roles: ['business'],
        apis: [{ path: '^/importSm2', methods: ['all'] }],

      },
      {
        menu: '导出ca证书',
        roles: ['business'],
        apis: [{ path: '^/exportCa', methods: ['all'] }],

      },
      {
        menu: '导出吊销列表',
        roles: ['business'],
        apis: [{ path: '^/exportCrl', methods: ['all'] }],

      },
      {
        menu: '导出sm2证书',
        roles: ['business'],
        apis: [{ path: '^/exportCert', methods: ['all'] }],

      },
      {
        menu: '根证书',
        roles: ['business','default'],
        apis: [{ path: '^/cacert', methods: ['all'] }],

      },
      {
        menu: 'sm2证书列表',
        roles: ['business'],
        apis: [{ path: '^/sm2cert/show', methods: ['all'] }],

      },
      {
        menu: '删除证书',
        roles: ['business'],
        apis: [{ path: '^/delcert', methods: ['all'] }],

      },
      {
        menu: '吊销证书',
        roles: ['business'],
        apis: [{ path: '^/revoke', methods: ['all'] }],

      },
      {
        menu: '发布吊销列表',
        roles: ['business'],
        apis: [{ path: '^/releasecrl', methods: ['all'] }],

      },
      {
        menu: '吊销列表展示',
        roles: ['business'],
        apis: [{ path: '^/crlcert', methods: ['all'] }],

      },
      {
        menu: '初始化进度',
        roles: ['all'],
        apis: [{ path: '^/initprogress', methods: ['all'] }],

      },
    ],
  },
  {
    menu: '系统日志',
    roles: ['audit'],
    apis: [{ path: '^/logs', methods: ['all'] }],
  },
];
