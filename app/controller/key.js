'use strict';
const BaseController = require('./base');

/**
 * @controller keys 密钥管理接口
 */
class KeyController extends BaseController {
  /**
   * @summary 生成密钥
   * @description
   * @router post /keys
   * @request body createKeyRequest *body
   * @response 200 baseResponse successed
   */
  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.validate(ctx.rule.createKeyRequest, params);
    await ctx.service.keys.create(params);
    this.message('生成密钥成功');
  }

  /**
   * @summary 密钥列表
   * @description
   * @router get /keys
   * @request query string keyindex 密钥索引
   * @request query string *keytype 密钥类型
   * @request query integer pageNo 页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 queryKeyResponse successed
   */
  async query() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.keys.query(query);
    this.success(result);
  }

  /**
   * @summary 删除密钥
   * @description
   * @router delete /keys/{keyindex}
   * @request path integer *keyindex 密钥索引
   * @request body string *keytype
   * @response 200 baseResponse successed
   */
  async del() {
    const { ctx } = this;
    const keyindex = ctx.params.keyindex;
    const { keytype } = ctx.request.body;
    await ctx.service.keys.del(keyindex, keytype);
    this.message('删除成功');
  }
}

module.exports = KeyController;
