'use strict';
const md5 = require('md5');
const BaseController = require('./base');
// 用来对密码进行二次加密
const HashSalt = 'will@wan-=[]';

/**
 * @controller user 用户接口
 */
class UserController extends BaseController {

  /**
   * @summary 新增用户
   * @description 新增用户
   * @router post /users
   * @request body createUserRequest *body
   * @response 200 baseResponse successed
   */
  async create() {
    const { ctx } = this;
    // 参数校验，如果参数错误，会自动返回，不用自己判断
    ctx.validate(ctx.rule.createUserRequest);
    const user = ctx.request.body;
    await ctx.service.user.create(user);
    this.message('新增用户成功');
  }

  /**
   * @summary 用户列表
   * @description 查询用户列表
   * @router get /users
   * @request query string username 用户名称
   * @request query string phone 手机号
   * @request query string startDate eg: 2022-10-15 起始日期（创建时间）
   * @request query string endDate eg：2022-10-16 截止日期（创建时间）
   * @request query string status eg: enable 状态，enable（启用）；disable（禁用）
   * @request query integer pageNo 页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 queryUserResponse successed
   */
  async query() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.user.query(query);
    this.success(result);
  }

  // 待开发或修改接口
  // 绑定ukey
  // 解绑ukey

  /**
   * @summary 修改状态
   * @description 修改用户状态
   * @router patch /users/{id}/status
   * @request path string *id 用户id
   * @request body updateUserStatusRequest *body
   * @response 200 baseResponse successed
   */
  async updateStatus() {
    const { ctx } = this;
    ctx.validate(ctx.rule.updateUserStatusRequest);
    await ctx.service.user.update(ctx.params, ctx.request.body);
    this.message('更新状态成功');
  }

  /**
   * @summary 修改密码
   * @description 修改用户密码
   * @router patch /users/{id}/password
   * @request path string *id 用户id
   * @request body updateUserPasswordRequest *body
   * @response 200 baseResponse successed
   */
  async updatePassword() {
    const { ctx } = this;
    ctx.validate(ctx.rule.updateUserPasswordRequest);

    const req = {};
    req.password = md5(`${ctx.request.body.password}.${HashSalt}`);
    await ctx.service.user.update(ctx.params, req);
    this.message('修改密码成功');
  }

  /**
   * @summary 修改角色
   * @description 修改用户角色
   * @router patch /users/{id}/role
   * @request path string *id 用户id
   * @request body updateUserRoleRequest *body
   * @response 200 baseResponse successed
   */
  async updateRole() {
    const { ctx } = this;
    ctx.validate(ctx.rule.updateUserRoleRequest);
    await ctx.service.user.update(ctx.params, ctx.request.body);
    this.message('修改角色成功');
  }

  /**
   * @summary 修改用户
   * @description
   * @router put /users/{id}
   * @request path string *id 用户id
   * @request body updateUserRequest *body
   * @response 200 baseResponse successed
   */
  async update() {
    const { ctx } = this;
    ctx.validate(ctx.rule.updateUserRequest);
    await ctx.service.user.update(ctx.params, ctx.request.body);
    this.message('修改成功');
  }

  /**
   * @summary 获取用户信息
   * @description 获取用户详细信息
   * @router get /users/{id}
   * @request path string *id 用户id
   * @response 200 userDetailResponse successed
   */
  async get() {
    const { ctx } = this;
    const { id } = ctx.params;
    const user = await ctx.service.user.get(id);
    this.success(user);
  }

  /**
   * @summary 删除用户
   * @description
   * @router delete /users/{id}
   * @request path string *id 用户id
   * @response 200 baseResponse successed
   */
  async del() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.user.del(id);
    this.message('删除成功');
  }
}

module.exports = UserController;
