'use strict';
const BaseController = require('./base');

/**
 * @controller interface 网络接口API
 */
class InterfaceController extends BaseController {
  /**
   * @summary 接口IP
   * @description
   * @router get /interface/ip
   * @response 200 queryInterfaceIpResponse successed
   */
  async ip() {
    const { ctx } = this;
    const result = await ctx.service.interface.ip();
    this.success(result);
  }
}

module.exports = InterfaceController;
