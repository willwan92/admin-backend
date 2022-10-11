'use strict';

// 中间件：
// 中间件是一个放置在 app/middleware 目录下的单独文件，
// 它需要 exports 一个普通的 function，接受两个参数：
// options: 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来。
// app: 当前应用 Application 的实例。

module.exports = ({ app }) => {
  // token验证函数(jwt插件本身就带有验证函数可以直接使用，这里为了了解中间件的使用自己实现的)
  // 如果token正确，执行下一步
  // 否则，返回登录过期，请重启新登录
  return async function verify(ctx, next) {
    try {
      let token = ctx.request.header.authorization;
      if (token) {
        token = token.replace('Bearer ', '');
      } else {
        ctx.body = {
          code: 401,
          message: '用户未登录，请登录',
        };
        return ctx.body;
      }
      const ret = await app.jwt.verify(token, app.config.jwt.secret);
      await next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        ctx.body = {
          code: 401,
          message: '登录过期，请重启新登录',
        };
        return ctx.body;
      }
      console.log('token验证错误', error);
    }
  };
};
