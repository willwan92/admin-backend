'use strict';
const BaseController = require('./base');

/**
 * @controller timout web超时时间接口
 */
class TimeoutController extends BaseController {
  /**
   * @summary 获取web超时间
   * @description
   * @router get /timeout
   * @response 200 timeoutConfResponse successed
   */
  async get() {
    const { ctx } = this;
    const timeout = await ctx.service.timeout.get();
    this.success(timeout);
  }

  /**
   * @summary 修改web超时间
   * @description
   * @router put /timeout
   * @request body updateTimeoutRequest *body
   * @response 200 baseResponse successed
   */
  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.validate(ctx.rule.updateTimeoutRequest, params);
    await ctx.service.timeout.update(params);
    this.message('修改成功');
  }
}

module.exports = TimeoutController;
