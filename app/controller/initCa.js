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
    const params = ctx.request.body;
    ctx.validate(ctx.rule.initCaRequest, params);
    ctx.service.initCa.init(params);
    this.message('证书初始化成功');
  }

  /**
   * @summary CA证书信息
   * @description CA证书详细信息
   * @router get /cacert/show
   * @response 200 caCertResponse successed
   */
 async query() {
  const { ctx } = this;
  const query = ctx.request.query;
  const result = await ctx.service.initCa.query(query);
  this.success(result);
}
}

module.exports = InitCaController;
