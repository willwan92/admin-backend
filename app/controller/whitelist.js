'use strict';
const BaseController = require('./base');

/**
 * @controller whitelist 白名单接口
 */
class WhitelistController extends BaseController {
  /**
   * @summary 添加白名单
   * @description
   * @router post /whitelists
   * @request body whitelistRequest *body
   * @response 200 baseResponse successed
   */
  async create() {
    const { ctx } = this;
    // 参数校验，如果参数错误，会自动返回，不用自己判断
    const params = ctx.request.body;
    ctx.validate(ctx.rule.whitelistRequest, params);
    await ctx.service.whitelist.create(params);
    this.message('添加白名单成功');
  }

  /**
   * @summary 修改白名单
   * @description
   * @router put /whitelists/{id}
   * @request path integer *id 白名单id
   * @request body whitelistRequest *body
   * @response 200 baseResponse successed
   */
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const params = ctx.request.body;
    ctx.validate(ctx.rule.whitelistRequest, params);
    await ctx.service.whitelist.update(id, params);
    this.message('修改白名单成功');
  }

  /**
   * @summary 白名单列表
   * @description
   * @router get /whitelists
   * @request query integer type 类型
   * @request query string ip 白名单ip
   * @request query string comment 备注
   * @request query integer pageNo 页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 queryWhitelistResponse successed
   */
  async query() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.whitelist.query(query);
    this.success(result);
  }

  /**
   * @summary 删除白名单
   * @description
   * @router delete /whitelists/{id}
   * @request path integer *id 白名单id
   * @response 200 baseResponse successed
   */
  async del() {
    const { ctx } = this;
    const id = ctx.params.id;
    await ctx.service.whitelist.del(id);
    this.message('删除成功');
  }
}

module.exports = WhitelistController;
