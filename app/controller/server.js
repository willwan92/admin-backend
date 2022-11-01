'use strict';
const BaseController = require('./base');

/**
 * @controller server 服务接口
 */
class ServerController extends BaseController {

  /**
   * @summary 添加服务
   * @description
   * @router post /servers
   * @request body createServerRequest *body
   * @response 200 baseResponse successed
   */
  async create() {
    const { ctx } = this;
    // 参数校验，如果参数错误，会自动返回，不用自己判断
    const params = ctx.request.body;
    ctx.validate(ctx.rule.createServerRequest, params);
    await ctx.service.server.create(params);
    this.message('添加服务成功');

  }

  /**
   * @summary 服务列表
   * @description
   * @router get /servers
   * @request query string ip 服务地址
   * @request query string port 服务端口
   * @request query string type 服务类型
   * @request query integer pageNo 页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 queryServerResponse successed
   */
  async query() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.server.query(query);
    this.success(result);
  }

  /**
   * @summary 删除服务
   * @description
   * @router delete /servers/{id}
   * @request path string *id 服务编号
   * @response 200 baseResponse successed
   */
  async del() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.server.del(id);
    this.message('删除成功');
  }
}

module.exports = ServerController;
