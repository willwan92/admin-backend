'use strict';

/**
 * menus字段说明：
 * menu: 必填，菜单或功能名称。
 * roles: 选填，有子菜单时可不填。有该功能权限的角色。角色说明：default（默认管理员）, system（系统管理员）,
 *       business（业务管理员）, audit（审计管理员）, all（所有角色）。
 * paths: 选填，有子菜单时可不填。该功能包含的API接口路径。为了简化配置，路径采用正则匹配，
 *        例如：'^/auth' 意为包含所有以 '^/auth' 开头的API接口路径。
 * children: 选填，子菜单。
 */
const menus = [
  {
    menu: '登录认证',
    roles: ['all'],
    paths: ['^/auth'],
  },
  {
    menu: '系统首页',
    roles: ['system', 'business', 'audit'],
    paths: ['^/home'],
  },
  {
    menu: '网络配置',
    children: [
      {
        menu: '接口IP',
        roles: ['system'],
        paths: ['^/interface'],
      },
      {
        menu: '系统路由',
        roles: ['system'],
        paths: ['^/sysroutes'],
      },
    ],
  },
  {
    menu: '用户管理',
    roles: ['system', 'default'],
    paths: ['^/users'],
  },
  {
    menu: '系统管理',
    children: [
      {
        menu: '时间管理',
        roles: ['system'],
        paths: ['^/timeout', '^/timer'],
      },
      {
        menu: '管理主机',
        roles: ['system'],
        paths: ['^/adminips'],
      },
      {
        menu: '设备管理',
        roles: ['system'],
        paths: ['^/reboots', '^/mngcard/checkcard'],
      },
      {
        menu: '系统升级',
        roles: ['system'],
        paths: ['^/sysupdates', '^/file/upload_pki'],
      },
    ],
  },
  {
    menu: '管理卡管理',
    roles: ['business'],
    paths: ['^/mngcard'],
  },
  {
    menu: '服务管理',
    roles: ['business'],
    paths: ['^/servers'],
  },
  {
    menu: '白名单管理',
    roles: ['business'],
    paths: ['^/whitelists'],
  },
  {
    menu: '密钥管理',
    roles: ['business'],
    paths: ['^/keys'],
  },
  {
    menu: '证书管理',
    children: [
      {
        menu: '根证书',
        roles: ['business'],
        paths: [],
      },
    ],
  },
  {
    menu: '系统日志',
    roles: ['audit'],
    paths: ['^/logs'],
  },
];

/**
 * 判断用户有没有gaicand
 * @param {*} menuItems 菜单项
 * @param {*} role 用户角色
 * @param {*} path 接口路径
 */
const hasPermission = (menuItems = [], role, path) => {
  let has = false;
  let menuItem;
  let menuItemRoles;
  let pLen;
  let pathItem;
  for (let i = 0, len = menuItems.length; i < len; i++) {
    menuItem = menuItems[i];
    menuItemRoles = menuItem.roles || [];
    pLen = menuItem.paths && menuItem.paths.length;

    for (let j = 0; j < pLen; j++) {
      pathItem = menuItem.paths[j];
      if (new RegExp(pathItem).test(path)) {
        if (menuItemRoles.includes(role) || menuItemRoles.includes('all')) {
          has = true;
          break;
        }
      }
    }

    if (!has && menuItem.children && menuItem.children.length) {
      has = hasPermission(menuItem.children, role, path);
    }

    if (has) break;
  }

  return has;
};

// 权限控制
module.exports = (option, app) => {
  // 1. 获取用户角色
  // 2. 获取当前接口路径
  // 3. 判断当前用户角色有权限的接口路径是否包含当前接口路径：
  //      3-1. 包含：next()
  //      3-2. 不包含：返回403

  return async (ctx, next) => {
    try {
      const path = ctx.request.path;
      const token = ctx.request.header.authorization;
      let user;
      if (token) {
        const { data } = await app.jwt.verify(token, app.config.jwt.secret);
        user = await ctx.model.User.findByPk(data.id);
      }

      const role = user && user.role;
      
      console.log(role, path, hasPermission(menus, role, path));
      if (hasPermission(menus, role, path)) {
        await next();
      } else {
        ctx.body = {
          code: 403,
          message: '用户没有此权限',
        };
        return ctx.body;
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 403,
        message: '用户没有此权限',
      };
      return ctx.body;
    }
  };
};
