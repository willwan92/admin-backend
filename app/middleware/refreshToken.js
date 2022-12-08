'use strict';

// 刷新token
module.exports = ({ app }) => {
  return async (ctx, next) => {
    try {
      const token = ctx.request.header.authorization;
      if (token) {
        const tokenData = await app.jwt.verify(token, app.config.jwt.secret);
        const timeout = await ctx.configModel.Timeout.findOne({
          where: {
            id: 1,
          },
        });
        const newToken = app.jwt.sign(
          {
            data: tokenData.data,
            exp: Math.floor(Date.now() / 1000) + 60 * timeout,
          },
          app.jwt.secret
        );

        ctx.cookies.set('token', newToken);
      }

      await next();
    } catch (error) {
      await next();
    }
  };
};
