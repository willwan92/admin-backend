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
    const query = ctx.request.query;
    const limit = query.pageSize ? Number(query.pageSize) : 10;
    const offset = query.pageNo ? (query.pageNo - 1) * limit - 1 : 0;

    const { count, rows } = await ctx.logModel.Log.findAndCountAll({
      limit,
      offset,
      attributes: [
        'date',
        'user',
        'sip',
        'pri',
        'type',
        'msg',
      ]
    });

    const result = {
      total: count,
      data: rows,
      pageNo: query.pageNo || 1,
      pageSize: query.pageSize || 10,
    };
    this.success(result);
  }


}

module.exports = LogController;
