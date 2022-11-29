'use strict';

const BaseController = require('./base');

/**
 * @controller initKey 设备密钥初始化接口
 */
class InitKeyController extends BaseController {
  /**
   * @summary 设备密钥初始化
   * @description
   * @router post /initKey
   * @response 200 baseResponse successed
   */
  initKey() {
    const { ctx } = this;
    ctx.service.initKey.init();
    this.message('设备密钥初始化成功');
  }

    /**
   * @summary ECC密钥访问控制码
   * @description
   * @router post /setpin
   * @request body setpinRequest *body
   * @response 200 baseResponse successed
   */
     setpin() {
      const { ctx } = this;
      const params = ctx.request.body;
      ctx.validate(ctx.rule.setpinRequest, params);
      ctx.service.initKey.setpin(params);
      this.message('访问控制码设置成功');
    }
}

module.exports = InitKeyController;
