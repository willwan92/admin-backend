'use strict';

const BaseController = require('../base');

/**
 * @controller reboot 设备关机重启(界面需先弹出是否重启对话框，用户点确认后再调接口)
 */
class rebootController extends BaseController {
  /**
   * @summary 重启设备
   * @description
   * @router post /reboots/reboot
   * @response 200 baseResponse successed
   */
  reboot() {
    const { ctx } = this;
    ctx.service.reboots.reboot.reboot();
    this.message('命令执行成功');
  }

   /**
   * @summary 关机
   * @description
   * @router post /reboots/halt
   * @response 200 baseResponse successed
   */
    halt() {
      const { ctx } = this;
      ctx.service.reboots.reboot.halt();
      this.message('命令执行成功');
    }
  
}

module.exports = rebootController;
