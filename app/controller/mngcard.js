'use strict';

const BaseController = require('./base');

/**
 * @controller mngcard 管理卡接口
 */
class MngcardController extends BaseController {
  // create() 参数：name, keyser, password ukey的PIN码
  /**
   * @summary 添加管理卡
   * @description
   * @router post /mngcard
   * @request body createMngcardRequest *body
   * @response 200 baseResponse successed
   */
  create() {
    const { ctx } = this;
    ctx.validate(ctx.rule.createMngcardRequest);
    const { name, keyser, password } = ctx.request.body;
    ctx.service.tools.execSync('/usr/local/bin/mngcard add', [
      name,
      keyser,
      password,
    ]);
    this.message('添加管理卡成功');
  }

  /**
   * @summary 修改密码
   * @description
   * @router patch /mngcard/password
   * @request body updateMngcardPwdRequest *body
   * @response 200 baseResponse successed
   */
  updatePassword() {
    const { ctx } = this;
    ctx.validate(ctx.rule.updateMngcardPwdRequest);
    const { keyser, oldPassword, newPassword } = ctx.request.body;
    ctx.service.tools.execSync('/usr/local/bin/mngcard set', [
      keyser,
      oldPassword,
      newPassword,
    ]);
    this.message('修改密码成功');
  }

  /**
   * @summary 管理卡认证（登录）
   * @description
   * @router post /mngcard/auth
   * @request body authMngcardPwdRequest *body
   * @response 200 baseResponse successed
   */
  auth() {
    const { ctx } = this;
    ctx.validate(ctx.rule.authMngcardPwdRequest);
    const { keyser, password } = ctx.request.body;
    ctx.service.tools.execSync('/usr/local/bin/mngcard auth', [
      keyser,
      password,
    ]);
    this.message('管理卡认证成功');
  }

  /**
   * @summary 管理卡退出登录
   * @description 清楚管理卡登录状态
   * @router post /mngcard/logout
   * @response 200 baseResponse successed
   */
  logout() {
    const { ctx } = this;
    ctx.service.tools.execSync('/usr/local/bin/mngcard clear login');
    this.message('修改密码成功');
  }
}

module.exports = MngcardController;
