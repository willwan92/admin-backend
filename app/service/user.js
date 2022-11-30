'use strict';

const md5 = require('md5');
// 用来对密码进行二次加密
const HashSalt = 'will@wan-=[]';
const Service = require('egg').Service;

class UserService extends Service {
  async checkUsername(username) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({
      where: { username },
    });
    return user;
  }

  // 新增用户
  async create(user) {
    const { ctx } = this;
    const { username, password } = user;
    if (await this.checkUsername(username)) {
      // 向上抛出异常，交给异常处理函数处理
      ctx.throw(433, '用户名已存在，请修改后再试');
    }

    user.password = md5(`${password}.${HashSalt}`);
    return await ctx.model.User.create(user);
  }

  //   查询用户列表
  async query(query) {
    const { ctx } = this;
    const where = {};
    const Op = ctx.app.Sequelize.Op;
    where.username = { [Op.not]:'admin'};
    query.username &&
      (where.username = { [Op.substring]: `${query.username}` ,[Op.not]:'admin'});
    query.phone && (where.phone = { [Op.substring]: `${query.phone}` });
    query.status && (where.status = query.status);
    query.startDate &&
      query.endDate &&
      (where.created_at = {
        [Op.between]: [
          new Date(`${query.startDate} 00:00:00`),
          new Date(`${query.endDate} 23:59:59`),
        ],
      });

    const pageParams = {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    };

    const attrs = [
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
    ];

    return await ctx.service.base.page(where, pageParams, 'User', attrs);
  }

  // 修改用户
  async update(params, data) {
    const { ctx } = this;
    const { id } = params;
    if (!id) {
      ctx.throw(433, '路径参数错误');
    }

    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.throw(433, '操作的数据的数据不存在');
    }

    return await user.update(data);
  }

   // 修改密码
   async updatepwd(params, data) {
    const { ctx } = this;
    const { id } = params;
    const { password,oldpassword } = data;

    const req = {};
    req.password = password;

    if (!id) {
      ctx.throw(433, '路径参数错误');
    }

    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.throw(433, '操作的数据的数据不存在');
    }
    const puser = await ctx.model.User.findOne({
      where: { id,password:oldpassword },
    });
    if (!puser) {
      ctx.throw(433, '您输入的旧密码不正确！');
    }
    return await user.update(req);
  }

  // 获取用户信息
  async get(id) {
    const { ctx } = this;
    if (!id) {
      ctx.throw(433, '参数错误');
    }

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
      ctx.throw(433, '查询的数据不存在');
    } else {
      return user;
    }
  }

  // 删除用户
  async del(id) {
    const { ctx } = this;
    if (!id) {
      ctx.throw(433, '参数错误');
    }

    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.throw(433, '操作的数据的数据不存在');
    }

    return await user.destroy();
  }
}

module.exports = UserService;
