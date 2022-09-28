'use strict';

const BaseController = require('./base');
const child_process = require('child_process');

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
    child_process.exec('/usr/local/bin/system_monitor', (err, stdout) => {
      if (err) {
        return this.error('系统错误，请稍后再试！');
      }

      try {
        const data = JSON.parse(stdout);
        this.success(data);
      } catch (err) {
        return this.error('系统错误，请稍后再试！');
      }
    });
  }

  /**
   * @summary 设备信息
   * @description
   * @router get /home/productInfo
   * @response 200 productInfoResponse successed
   */
  async productInfo() {
    child_process.exec('/usr/local/bin/product_info', (err, stdout) => {
      if (err) {
        return this.error('系统错误，请稍后再试！');
      }

      try {
        const data = JSON.parse(stdout);
        this.success(data);
      } catch (err) {
        return this.error('系统错误，请稍后再试！');
      }
    });
  }

  /**
   * @summary 接口状态
   * @description
   * @router get /home/interfaceMonitor
   * @response 200 interfaceMonitorResponse successed
   */
  async interfaceMonitor() {
    child_process.exec('/usr/local/bin/interface_monitor', (err, stdout) => {
      if (err) {
        return this.error('系统错误，请稍后再试！');
      }

      try {
        const data = JSON.parse(stdout);
        this.success(data);
      } catch (err) {
        return this.error('系统错误，请稍后再试！');
      }
    });
  }
}

module.exports = HomeController;
