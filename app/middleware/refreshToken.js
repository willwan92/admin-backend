'use strict';

// 刷新token
module.exports = (option, app) => {
  return async (ctx, next) => {
    // 白名单接口：调用这些接口不刷新token
    const whiteList = [
      '/auth/login',
      '/auth/logout',
      '/home/systemMonitor',
      '/home/interfaceMonitor',
    ];

    try {
      const path = ctx.request.path;
      const token = ctx.request.header.authorization;
      if (token) {
        const tokenData = await app.jwt.verify(token, app.config.jwt.secret);
        const { timeout } = await ctx.configModel.Timeout.findByPk(1);
        const newToken = app.jwt.sign(
          {
            data: tokenData.data,
            exp: Math.floor(Date.now() / 1000) + 60 * timeout,
          },
          app.jwt.secret
        );

        if (!whiteList.includes(path)) {
          ctx.cookies.set('TOKEN', newToken, { httpOnly: false });
        }
      }

      await next();
    } catch (error) {
      console.log(error);
      await next();
    }
  };
};
