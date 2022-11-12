'use strict';
const BaseController = require('./base');

/**
 * @controller keybackup 密钥备份接口
 */
class KeybackupController extends BaseController {
  /**
   * @summary 密钥备份时的管理卡登录
   * @description
   * @router post /keybackup/mngcardLogin
   * @request body mngcardLoginRequest *body
   * @response 200 baseResponse successed
   */
  async mngcardLogin() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.validate(ctx.rule.mngcardLoginRequest, params);
    await ctx.service.keybackup.mngcardLogin(params);
    this.message(`管理卡 ${params.cardNum} 登录成功`);
  }

  /**
   * @summary 选择备份类型
   * @description
   * @router post /keybackup/selectBackupType
   * @request body selectbackupTypeRequest *body
   * @response 200 baseResponse successed
   */
  async selectBackupType() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.validate(ctx.rule.selectbackupTypeRequest, params);
    await ctx.service.keybackup.selectBackupType(params);
    this.message('选择备份类型成功');
  }

  /**
   * @summary 管理卡备份
   * @description
   * @router post /keybackup/mngcardBackup
   * @request body mngcardBackupRequest *body
   * @response 200 baseResponse successed
   */
  async mngcardBackup() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.validate(ctx.rule.mngcardBackupRequest, params);
    await ctx.service.keybackup.mngcardBackup(params);
    this.message(`管理卡 ${params.cardNum} 备份成功`);
  }

  /**
   * @summary 密钥恢复
   * @description
   * @router post /keybackup/restoreInit
   * @request body restoreInitRequest *body
   * @response 200 baseResponse successed
   */
  async restoreInit() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.validate(ctx.rule.restoreInitRequest, params);
    await ctx.service.keybackup.restoreInit(params);
    this.message('密钥恢复失败');
  }

  /**
   * @summary 管理卡恢复
   * @description
   * @router post /keybackup/mngcardRestore
   * @request body mngcardRestoreRequest *body
   * @response 200 baseResponse successed
   */
  async mngcardRestore() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.validate(ctx.rule.mngcardRestoreRequest, params);
    await ctx.service.keybackup.mngcardRestore(params);
    this.message(`管理卡 ${params.cardNum} 恢复成功`);
  }
}

module.exports = KeybackupController;
