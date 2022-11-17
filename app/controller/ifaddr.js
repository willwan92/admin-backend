'use strict';
const BaseController = require('./base');

/**
 * @controller ifaddr 接口ip接口
 */
class IfaddrController extends BaseController {
  /**
   * @summary 添加接口ip
   * @description
   * @router post /ifaddrs
   * @request body ifaddrRequest *body
   * @response 200 baseResponse successed
   */
  async create() {
    const { ctx } = this;
    // 参数校验，如果参数错误，会自动返回，不用自己判断
    const params = ctx.request.body;
    ctx.validate(ctx.rule.ifaddrRequest, params);
    await ctx.service.ifaddr.create(params);
    this.message('添加ip成功');
  }

  /**
   * @summary 接口ip列表
   * @description
   * @router get /ifaddrs
   * @request query string ifname 接口名称
   * @request query string ip 接口ip
   * @request query integer pageNo 页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 ifaddrResponse successed
   */
   async query() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.ifaddr.query(query);
    this.success(result);
  }
  /**
   * @summary 删除接口地址
   * @description
   * @router delete /ifaddrs/{ip}
   * @request path string *ip 需要删除的接口ip
   * @response 200 baseResponse successed
   */
   async del() {
    const { ctx } = this;
    const ip = ctx.params.ip;
    await ctx.service.ifaddr.del(ip);
    this.message('删除成功');
  }
}
module.exports = IfaddrController;
