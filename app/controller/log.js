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
   * @request query string startDate 开始时间
   * @request query string endDate 结束时间
   * @request query string user 用户
   * @request query integer type 日志类型
   * @request query integer pri 优先级
   * @request query string sip 源ip
   * @request query string msg 日志信息
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

   /**
   * @summary 日志导出
   * @description
   * @router get /logs/export
   * @request query integer type 日志类型('0所有日志，1规则日志，2设备管理，3设备状态，13HA日志，200其他')
   * @request query string startDate 开始时间
   * @request query string endDate 结束时间
   * @response 200 baseResponse successed
   */
    export() {
      const { ctx } = this;
      //ctx.validate(ctx.rule.logExportRequest);
      const logParams = ctx.request.query;
      ctx.service.log.export(logParams);
      //this.message('导出成功');
    }
}

module.exports = LogController;
