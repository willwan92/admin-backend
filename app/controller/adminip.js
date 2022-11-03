'use strict';
const BaseController = require('./base');

/**
 * @controller adminip 管理主机接口
 */
class AdminipController extends BaseController {
  /**
   * @summary 添加管理主机
   * @description
   * @router post /adminips
   * @request body createAdminipRequest *body
   * @response 200 baseResponse successed
   */
  async create() {
    const { ctx } = this;
    // 参数校验，如果参数错误，会自动返回，不用自己判断
    const params = ctx.request.body;
    ctx.validate(ctx.rule.createAdminipRequest, params);
    await ctx.service.adminip.create(params);
    this.message('添加管理主机成功');
  }

  /**
   * @summary 修改管理主机
   * @description
   * @router patch /adminips/{id}
   * @request path integer *id 管理主机id
   * @request body updateAdminipRequest *body
   * @response 200 baseResponse successed
   */
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const params = ctx.request.body;
    ctx.validate(ctx.rule.updateAdminipRequest, params);
    await ctx.service.adminip.update(id, params);
    this.message('修改管理主机成功');
  }

  /**
   * @summary 管理主机列表
   * @description
   * @router get /adminips
   * @request query string ip 管理主机ip
   * @request query string comment 备注
   * @request query integer pageNo 页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 queryAdminipResponse successed
   */
  async query() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.adminip.query(query);
    this.success(result);
  }

  /**
   * @summary 删除管理主机
   * @description
   * @router delete /adminips/{id}
   * @request path integer *id 管理主机id
   * @response 200 baseResponse successed
   */
  async del() {
    const { ctx } = this;
    const id = ctx.params.id;
    await ctx.service.adminip.del(id);
    this.message('删除成功');
  }
}

module.exports = AdminipController;
