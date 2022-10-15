'use strict';
const md5 = require('md5');
const BaseController = require('./base');
// 用来对密码进行二次加密
const HashSalt = 'will@wan-=[]';

/**
 * @controller user 用户接口
 */
class UserController extends BaseController {
  async checkUsername(username) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({
      where: { username },
    });
    return user;
  }

  /**
   * @summary 新建用户
   * @description 新建用户
   * @router post /users
   * @request body createUserRequest *body
   * @response 200 baseResponse successed
   */
  async create() {
    const { ctx } = this;
    // 如果参数错误，会自动返回，不用自己判断
    ctx.validate(ctx.rule.createUserRequest);
    const { username, password } = ctx.request.body;
    if (await this.checkUsername(username)) {
      return this.error('用户名已存在，请修改后再试');
    }
    const user = ctx.request.body;
    user.password = md5(`${password}.${HashSalt}`);

    try {
      await ctx.model.User.create(user);
      this.message('新增用户成功');
    } catch (error) {
      console.log(error);
      this.error('新增失败，请稍后再试');
    }
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
    const where = {};
    const query = ctx.request.query;
    const Op = ctx.app.Sequelize.Op;
    query.username &&
      (where.username = { [Op.substring]: `${query.username}` });
    query.phone && (where.phone = { [Op.substring]: `${query.phone}` });
    query.status && (where.status = query.status);
    const limit = query.pageSize ? Number(query.pageSize) : 10;
    const offset = query.pageNo ? (query.pageNo - 1) * limit - 1 : 0;
    query.startDate &&
      query.endDate &&
      (where.created_at = {
        [Op.between]: [
          new Date(`${query.startDate} 00:00:00`),
          new Date(`${query.endDate} 23:59:59`),
        ],
      });

    const { count, rows } = await ctx.model.User.findAndCountAll({
      where,
      limit,
      offset,
      attributes: [
        'id',
        'username',
        'nickname',
        'role',
        'phone',
        'email',
        'key',
        'gender',
        'status',
        'remarks',
        'created_at',
      ],
    });

    const result = {
      total: count,
      data: rows,
      pageNo: query.pageNo || 1,
      pageSize: query.pageSize || 10,
    };
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
    const { id } = ctx.params;
    if (!id) {
      return this.error('参数错误');
    }

    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      return this.error('操作的数据的数据不存在，请刷新后重试');
    }

    ctx.validate(ctx.rule.updateUserStatusRequest);

    try {
      await user.update(ctx.request.body);
      this.message('更新状态成功');
    } catch (err) {
      this.message('更新状态失败，请稍后再试。');
    }
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
    const { id } = ctx.params;
    if (!id) {
      return this.error('参数错误');
    }

    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      return this.error('操作的数据的数据不存在，请刷新后重试');
    }

    ctx.validate(ctx.rule.updateUserPasswordRequest);

    const req = {};
    req.password = md5(`${ctx.request.body.password}.${HashSalt}`);
    try {
      await user.update(req);
      this.message('修改密码成功');
    } catch (err) {
      this.message('修改密码失败，请稍后再试。');
    }
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
    const { id } = ctx.params;
    if (!id) {
      return this.error('参数错误');
    }

    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      return this.error('操作的数据的数据不存在，请刷新后重试');
    }

    ctx.validate(ctx.rule.updateUserRoleRequest);

    try {
      await user.update(ctx.request.body);
      this.message('修改角色成功');
    } catch (err) {
      this.message('修改角色失败，请稍后再试。');
    }
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
    const { id } = ctx.params;
    if (!id) {
      return this.error('参数错误');
    }

    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      return this.error('操作的数据的数据不存在，请刷新后重试');
    }

    ctx.validate(ctx.rule.updateUserRequest);

    try {
      await user.update(ctx.request.body);
      this.message('修改成功');
    } catch (err) {
      this.message('修改失败，请稍后再试。');
    }
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
    if (!id) {
      this.error('参数错误');
    } else {
      const user = await ctx.model.User.findByPk(id, {
        attributes: [
          'id',
          'username',
          'nickname',
          'role',
          'phone',
          'email',
          'key',
          'gender',
          'status',
          'remarks',
        ],
      });
      if (!user) {
        this.error('查询的数据不存在');
      } else {
        this.success(user);
      }
    }
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
    if (!id) {
      this.error('参数错误');
    } else {
      const user = await ctx.model.User.destroy({
        where: {
          id,
        },
      });
      if (!user) {
        this.error('操作的数据不存在');
      } else {
        this.success();
      }
    }
  }
}

module.exports = UserController;
