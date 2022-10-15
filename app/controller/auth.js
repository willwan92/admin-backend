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

    if (!captcha || (captcha && captcha.toLocaleLowerCase() !== sessionCaptcha)) {
      return this.error('验证码错误！');
    }

    const user = await ctx.model.User.findOne({
      where: {
        username,
        password: md5(`${password}.${HashSalt}`),
      },
    });
    // 登录成功返回token、用户名
    if (user) {
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
      this.success({
        token,
        username,
        userId: user.id,
      });

      // 调用 rotateCsrfSecret 刷新用户的 CSRF token
      ctx.rotateCsrfSecret();
    } else {
      this.error('用户名或密码错误');
    }
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
