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

   /**
   * @summary 接口名称
   * @description
   * @router get /interface/listif
   * @response 200 queryInterfaceListIfResponse successed
   */
    async listif() {
      const { ctx } = this;
      const result = await ctx.service.interface.listif();
      this.success(result);
    }

    /**
   * @summary 掩码列表
   * @description
   * @router get /interface/listmask
   * @response 200 queryInterfaceListMaskResponse successed
   */
     async listmask() {
      const { ctx } = this;
      const result = await ctx.service.interface.listmask();
      this.success(result);
    }
}

module.exports = InterfaceController;
