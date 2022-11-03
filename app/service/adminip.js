'use strict';

const Service = require('egg').Service;

class AdminipService extends Service {
  async create(params) {
    const { ctx } = this;
    const cmd = 'adminhost';
    const { ip, comment } = params;
    const args = ['add', ip, comment || ''];

    return ctx.service.base.execSync(cmd, args);
  }

  async update(id, params) {
    const { ctx } = this;
    if (!id) {
      ctx.throw(433, '参数错误');
    }

    const object = await ctx.configModel.Adminip.findByPk(id);
    if (!object) {
      ctx.throw(433, '操作的数据不存在');
    }

    const cmd = 'adminhost';
    const { comment } = params;
    const args = ['set', object.ip, comment || ''];

    return ctx.service.base.execSync(cmd, args);
  }

  async query(query) {
    const { ctx } = this;
    const where = {};
    const Op = ctx.app.Sequelize.Op;
    query.ip && (where.ip = { [Op.substring]: `${query.ip}` });
    query.comment && (where.comment = { [Op.substring]: `${query.comment}` });

    const attrs = ['id', 'ip', 'comment'];
    const pageParams = {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    };

    return await ctx.service.base.page(
      where,
      pageParams,
      'Adminip',
      attrs,
      'configModel'
    );
  }

  async del(ip) {
    const { ctx } = this;
    if (!ip) {
      ctx.throw(433, '参数错误');
    }

    const object = await ctx.configModel.Adminip.findOne({
      where: {
        ip,
      },
    });

    if (!object) {
      ctx.throw(433, '操作的数据不存在');
    }

    const result = ctx.service.base.execSync('adminhost', ['del', object.id]);
    if (!result.error) {
      return await object.destroy();
    }
  }
}

module.exports = AdminipService;
