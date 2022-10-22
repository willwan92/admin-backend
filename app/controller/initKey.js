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
}

module.exports = InitKeyController;
