'use strict';

const { whiteList } = require('../config/middleware.js');

// 中间件：
// 中间件是一个放置在 app/middleware 目录下的单独文件，
// 它需要 exports 一个普通的 function，接受两个参数：
// options: 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来。
// app: 当前应用 Application 的实例。

module.exports = (option, app) => {
  // token验证函数
  // 如果token正确，执行下一步
  // 否则，返回未登录或者登录过期，请重启新登录
  return async (ctx, next) => {
    // 白名单接口：不需要验证token
    try {
      const token = ctx.request.header.authorization;
      const path = ctx.request.path;

      if (whiteList.findIndex((item) => new RegExp(item).test(path)) !== -1) {
        return await next();
      }

      if (!token) {
        ctx.body = {
          code: 401,
          message: '用户未登录，请登录',
        };
        return ctx.body;
      }

      await app.jwt.verify(token, app.config.jwt.secret);
      await next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        ctx.body = {
          code: 401,
          message: '登录过期，请重启新登录',
        };
        return ctx.body;
      }
    }
  };
};
