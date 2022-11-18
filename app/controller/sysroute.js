'use strict';
const BaseController = require('./base');

/**
 * @controller sysroute 系统路由接口
 */
class SysrouteController extends BaseController {
  /**
   * @summary 添加路由
   * @description
   * @router post /sysroutes
   * @request body createSysrouteRequest *body
   * @response 200 baseResponse successed
   */
  async create() {
    const { ctx } = this;
    // 参数校验，如果参数错误，会自动返回，不用自己判断
    const params = ctx.request.body;
    ctx.validate(ctx.rule.createSysrouteRequest, params);
    await ctx.service.sysroute.create(params);
    this.message('添加路由成功');
  }

  /**
   * @summary 路由列表
   * @description
   * @router get /sysroutes
   * @request query string ip 目的ip
   * @request query string mask 目的掩码
   * @request query string gwip 网关地址
   * @request query integer pageNo 页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 querySysrouteResponse successed
   */
   async query() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.sysroute.query(query);
    this.success(result);
  }

  /**
   * @summary 删除路由
   * @description
   * @router delete /sysroutes/{id}
   * @request path integer *id 路由id
   * @response 200 baseResponse successed
   */
  async del() {
    const { ctx } = this;
    const id = ctx.params.id;
    await ctx.service.sysroute.del(id);
    this.message('删除成功');
  }

}

module.exports = SysrouteController;
