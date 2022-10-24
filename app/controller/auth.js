'use strict';
const BaseController = require('./base');

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
    const { ctx } = this;
    const params = ctx.ctx.request.body;
    ctx.validate(ctx.rule.userLoginRequest, params);
    const result = await ctx.service.auth.login(params);
    this.success(result);
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
    const params = ctx.ctx.request.body;
    ctx.validate(ctx.rule.userLogoutRequest, params);
    ctx.service.auth.logout(params);
    this.message('退出成功');
  }

  /**
   * @summary 验证码
   * @description 生成验证码
   * @router get /auth/captcha
   * @response 200（返回'image/svg+xml'图片）
   */
  async captcha() {
    const { ctx } = this;
    const captcha = ctx.service.captcha();
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }
}

module.exports = AuthController;
