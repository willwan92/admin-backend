'use strict';

const BaseController = require('./base');

/**
 * @controller sysupdate 系统升级接口
 */
class SysUpdateController extends BaseController {
  /**
   * @summary 系统升级
   * @description
   * @router post /sysupdates
   * @response 200 baseResponse successed
   */
  update() {
    const { ctx } = this;
    ctx.service.sysupdate.update();
    this.message('系统升级成功');
  }


 /**
   * @summary 升级列表
   * @description
   * @router get /sysupdates
   * @request query string version 版本
   * @request query string des 升级描述
   * @request query integer pageNo 页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 querySysupdateResponse successed
   */
  async query() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.sysupdate.query(query);
    this.success(result);
  }
}
module.exports = SysUpdateController;
