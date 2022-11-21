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
   * @request body loginMngcardRequest *body
   * @response 200 baseResponse successed
   */
  auth() {
    const { ctx } = this;
    ctx.validate(ctx.rule.loginMngcardRequest);
    ctx.service.mngcard.login();
    this.message('管理卡登录成功');
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

  /**
   * @summary 管理卡列表
   * @description
   * @router get /mngcard
   * @request query string name 管理卡名称
   * @request query string usrtype 类型
   * @request query string keyser 序号
   * * @request query string phone 电话
   * @request query integer pageNo 页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 queryMngcardResponse successed
   */
   async query() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.mngcard.query(query);
    this.success(result);
  }

  /**
   * @summary 算法自检
   * @description
   * @router patch /mngcard/checkcard
   * @request body algTestRequest *body
   * @response 200 baseResponse successed
   */
   checkcard() {
    const { ctx } = this;
    ctx.validate(ctx.rule.algTestRequest);
    ctx.service.mngcard.checkcard();
    this.message('测试成功');
  }
}

module.exports = MngcardController;
