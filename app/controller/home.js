'use strict';

const BaseController = require('./base');

/**
 * @controller home 首页接口
 */
class HomeController extends BaseController {
  /**
   * @summary 系统资源信息
   * @description 系统资源监控
   * @router get /home/systemMonitor
   * @response 200 systemMonitorResponse successed
   */
  async systemMonitor() {
    const result = this.ctx.service.home.execHomeCmd(
      '/usr/local/bin/system_monitor'
    );
    this.success(result);
  }

  /**
   * @summary 设备信息
   * @description
   * @router get /home/productInfo
   * @response 200 productInfoResponse successed
   */
  async productInfo() {
    const result = this.ctx.service.home.execHomeCmd(
      '/usr/local/bin/product_info'
    );
    this.success(result);
  }

  /**
   * @summary 接口状态
   * @description
   * @router get /home/interfaceMonitor
   * @response 200 interfaceMonitorResponse successed
   */
  async interfaceMonitor() {
    const result = this.ctx.service.home.execHomeCmd(
      '/usr/local/bin/interface_monitor'
    );
    this.success(result);
  }

  /**
   * @summary 算法自测试
   * @description
   * @router get /home/algTest
   * @response 200 algTestResponse successed
   */
  async algTest() {
    const result = this.ctx.service.home.execHomeCmd('/usr/local/bin/algtest');
    this.success(result);
  }
 
}

module.exports = HomeController;
