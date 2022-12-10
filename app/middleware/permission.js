'use strict';

const { menus, whiteList } = require('../config/middleware');

/**
 * 判断用户有没有接口权限
 * @param {Array} menuItems 菜单项
 * @param {string} role 用户角色
 * @param {string} path 接口路径
 * @param {string} method 请求方法
 */
const hasPermission = (menuItems = [], role, path, method) => {
  let has = false;
  let menuItem;
  let menuItemRoles;
  let apisLen;
  let apiItem;
  for (let i = 0, len = menuItems.length; i < len; i++) {
    menuItem = menuItems[i];
    menuItemRoles = menuItem.roles || [];
    apisLen = menuItem.apis && menuItem.apis.length;

    for (let j = 0; j < apisLen; j++) {
      apiItem = menuItem.apis[j];
      if (
        new RegExp(apiItem.path).test(path) &&
        (apiItem.methods.includes(method) || apiItem.methods.includes('all'))
      ) {
        if (menuItemRoles.includes(role) || menuItemRoles.includes('all')) {
          has = true;
          break;
        }
      }
    }

    if (!has && menuItem.children && menuItem.children.length) {
      has = hasPermission(menuItem.children, role, path, method);
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
      if (whiteList.findIndex((item) => new RegExp(item).test(path)) !== -1) {
        return await next();
      }

      let user;
      const token = ctx.request.header.authorization;
      if (token) {
        const { data } = await app.jwt.verify(token, app.config.jwt.secret);
        user = await ctx.model.User.findByPk(data.id);
      }

      const role = user && user.role;
      const method = ctx.request.method.toLocaleLowerCase();
      if (hasPermission(menus, role, path, method)) {
        await next();
      } else {
        ctx.body = {
          code: 403,
          message: '用户没有此权限',
        };
        return ctx.body;
      }
    } catch (error) {
      ctx.body = {
        code: 403,
        message: '用户没有此权限',
      };
      return ctx.body;
    }
  };
};
