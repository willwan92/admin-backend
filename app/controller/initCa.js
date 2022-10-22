'use strict';

const BaseController = require('./base');

/**
 * @controller initCa 证书初始化接口
 */
class InitCaController extends BaseController {
  /**
   * @summary 证书初始化
   * @description
   * @router post /initCa
   * @request body initCaRequest *body
   * @response 200 baseResponse successed
   */
  initCa() {
    const { ctx } = this;
    ctx.validate(ctx.rule.initCaRequest);
    ctx.service.initCa.init();
    this.message('证书初始化成功');
  }
}

module.exports = InitCaController;
