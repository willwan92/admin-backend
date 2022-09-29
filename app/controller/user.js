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
    // const { username, password, captcha } = ctx.request.body;
    const { username, password } = ctx.request.body;
    //   if (captcha.toLocaleLowerCase() !== ctx.session.captcha.toLocaleLowerCase()) {
    //     this.error('验证码错误');
    //   } else {
    if (await this.checkUsername(username)) {
      return this.error('用户名已存在，请修改后再试');
    }
    const user = {
      username,
      password: md5(`${password}.${HashSalt}`),
    };

    try {
      await ctx.model.User.create(user);
      this.message('新建成功');
    } catch (error) {
      this.error('新建失败，请稍后再试');
    }
  }

  /**
   * @summary 用户列表
   * @description 查询用户列表
   * @router get /users
   * @response 200 queryUserResponse successed
   */
  async query() {
    const { ctx } = this;
    const user = await ctx.model.User.findAll();
    this.success(user);
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
      const user = await ctx.model.User.findByPk(id);
      if (!user) {
        this.error('查询的数据不存在');
      } else {
        this.success(user);
      }
    }
  }
}

module.exports = UserController;
