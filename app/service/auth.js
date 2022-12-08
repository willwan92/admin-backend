'use strict';

const md5 = require('md5');
// 用来对密码进行二次加密
const HashSalt = 'will@wan-=[]';
const Service = require('egg').Service;

class AuthService extends Service {
  async login(params) {
    const { ctx, app } = this;
    const { username, password, captcha } = params;
    const sessionCaptcha = ctx.session.captcha;

    if (
      !captcha ||
      (captcha && captcha.toLocaleLowerCase() !== sessionCaptcha)
    ) {
      // 删除上次保存的验证码，前端需要刷新验证码
      ctx.session.captcha = null;
      ctx.throw(433, '验证码错误！');
    }

    const user = await ctx.model.User.findOne({
      where: {
        username,
        password: md5(`${password}.${HashSalt}`),
      },
    });

    if (!user) {
      ctx.service.base.syslog(2, 4, '用户名或密码错误', username);
      ctx.session.captcha = null;
      ctx.throw(433, '用户名或密码错误');
    }

    if (user.status !== 'enable') {
      ctx.throw(433, '该用户已停用');
    }

    // 生成token
    const timeout = await ctx.configModel.Timeout.findOne({
      where: {
        id: 1,
      },
    });
    const token = app.jwt.sign(
      {
        data: {
          username,
          id: user.id,
        },
        // 设置过期时间这里要使用 exp ，使用 expiresIn 不生效
        exp: Math.floor(Date.now() / 1000) + 60 * timeout,
      },
      app.jwt.secret
    );

    // 记录日志
    ctx.service.base.syslog(2, 6, '登录成功', username);

    // 保存当前用户名到session中
    ctx.session.username = username;

    // 调用 rotateCsrfSecret 刷新用户的 CSRF token
    ctx.rotateCsrfSecret();

    return {
      token,
      username,
      userId: user.id,
    };
  }

  logout(params) {
    const { ctx } = this;
    const { username } = params;
    ctx.session.username = null;
    ctx.service.base.syslog(2, 4, '退出登录', username);
  }

  captcha() {
    const { ctx } = this;
    const captcha = ctx.service.base.createCaptcha();
    ctx.session.captcha = captcha.text.toLocaleLowerCase();
    return captcha;
  }
}

module.exports = AuthService;
