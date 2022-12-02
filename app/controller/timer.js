'use strict';

const BaseController = require('./base');

/**
 * @controller timer 时间管理接口
 */
class timerController extends BaseController {
  /**
   * @summary 设置系统时间
   * @description
   * @router post /timer/settime
   * @request body timerRequest *body
   * @response 200 baseResponse successed
   */
  settime() {
    const { ctx } = this;
      const params = ctx.request.body;
      ctx.validate(ctx.rule.timerRequest, params);
      ctx.service.timer.settime(params);
      this.message('时间设置成功');
  }

   /**
   * @summary 获取系统时间
   * @description
   * @router get /timer/gettime
   * @response 200 systimeResponse successed
   */
    async gettime() {
        const result = this.ctx.service.home.execHomeCmd('/usr/local/bin/sys_time');
        this.success(result);
      }
}

module.exports = timerController;
