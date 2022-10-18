'use strict';
const md5 = require('md5');
const BaseController = require('./base');
// 用来对密码进行二次加密
const HashSalt = 'will@wan-=[]';

/**
 * @controller 用户认证
 */
class AuthController extends BaseController {
  /**
   * @summary 登录
   * @description 用户登录
   * @router post /auth/login
   * @request body userLoginRequest *body
   * @response 200 userLoginResponse 登录成功
   */
  async login() {
    const { ctx, app } = this;
    const { username, password, captcha } = ctx.request.body;
    const sessionCaptcha = ctx.session.captcha;
    const hostip = ctx.request.ip;
    const syslog = ctx.service.tools.syslog;

    if (!captcha || (captcha && captcha.toLocaleLowerCase() !== sessionCaptcha)) {
      return this.error('验证码错误！');
    }

    const user = await ctx.model.User.findOne({
      where: {
        username,
        password: md5(`${password}.${HashSalt}`),
      },
    });

    if (user) {
      if (user.status !== 'enable') {
        return this.error('该用户已停用');
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
      // 登录成功返回token、用户名
      this.success({
        token,
        username,
        userId: user.id,
      });

      // 记录日志
      syslog(2, 6, hostip, username, '登录成功');

      // 调用 rotateCsrfSecret 刷新用户的 CSRF token
      ctx.rotateCsrfSecret();
    } else {
      syslog(2, 4, hostip, username, '用户名或密码错误');
      this.error('用户名或密码错误');
    }
  }

  /**
   * @summary 退出登录
   * @description 
   * @router post /auth/logout
   * @request body userLogoutRequest *body
   * @response 200 baseResponse 退出登录成功
   */
   async logout() {
    const { ctx } = this;
    const { username } = ctx.request.body;
    const hostip = ctx.request.ip;
    const syslog = ctx.service.tools.syslog;
    this.message('退出成功');
    syslog(2, 4, hostip, username, '退出登录');
  }

  /**
   * @summary 验证码
   * @description 生成验证码
   * @router get /auth/captcha
   * @response 200（返回'image/svg+xml'图片）
   */
  async captcha() {
    const { ctx } = this;
    const captcha = this.service.tools.captcha();
    ctx.session.captcha = captcha.text.toLocaleLowerCase();
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }
}

module.exports = AuthController;
