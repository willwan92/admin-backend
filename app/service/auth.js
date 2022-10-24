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
      ctx.throw(433, '验证码错误！');
    }

    const user = await ctx.model.User.findOne({
      where: {
        username,
        password: md5(`${password}.${HashSalt}`),
      },
    });

    const hostip = ctx.request.ip;
    const syslog = ctx.service.base.syslog;
    if (!user) {
      syslog(2, 4, hostip, username, '用户名或密码错误');
      ctx.throw(433, '用户名或密码错误');
    }

    if (user.status !== 'enable') {
      ctx.throw(433, '该用户已停用');
    }

    // 生成token
    const token = app.jwt.sign(
      {
        data: {
          username,
          id: user.id,
        },
        // 设置过期时间这里要使用 exp ，使用 expiresIn 不生效
        exp: Math.floor(Date.now() / 1000) + 3600 * 4,
      },
      app.jwt.secret
    );

    // 记录日志
    syslog(2, 6, hostip, username, '登录成功');
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
    const hostip = ctx.request.ip;
    const syslog = ctx.service.base.syslog;
    syslog(2, 4, hostip, username, '退出登录');
  }

  captcha() {
    const { ctx } = this;
    const captcha = ctx.service.base.createCaptcha();
    ctx.session.captcha = captcha.text.toLocaleLowerCase();
    return captcha;
  }
}

module.exports = AuthService;
