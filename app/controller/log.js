'use strict';
const BaseController = require('./base');

/**
 * @controller log 日志接口
 */
class LogController extends BaseController {
  /**
   * @summary 日志列表
   * @description 查询日志列表
   * @router get /logs
   * @request query integer pageNo 页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 queryLogResponse successed
   */
  async query() {
    const { ctx } = this;
    const queryParams = ctx.request.query;
    const result = await ctx.service.log.query(queryParams);
    this.success(result);
  }
}

module.exports = LogController;
