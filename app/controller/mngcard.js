'use strict';

const BaseController = require('./base');

/**
 * @controller mngcard 管理卡接口
 */
class MngcardController extends BaseController {
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
    ctx.service.mngcard.create();
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
    ctx.service.mngcard.updatePassword();
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
    ctx.service.mngcard.auth();
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
    ctx.service.mngcard.logout();
    this.message('管理卡退出登录成功');
  }
}

module.exports = MngcardController;
