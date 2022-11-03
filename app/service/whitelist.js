'use strict';

const Service = require('egg').Service;

class WhitelistService extends Service {
  async create(params) {
    const { ctx } = this;
    const { type, ip, port, protocol, comment } = params;

    const object = await ctx.configModel.Whitelist.findOne({
      where: {
        ip,
      },
    });

    if (object) {
      ctx.throw(433, `白名单 ${ip} 已存在`);
    }

    const cmd = 'whitelist';
    const args = ['add', type, ip, port, protocol, comment || ''];
    return ctx.service.base.execSync(cmd, args);
  }

  async update(id, params) {
    const { ctx } = this;
    if (!id) {
      ctx.throw(433, '缺少id参数');
    }

    const object = await ctx.configModel.Whitelist.findByPk(id);
    if (!object) {
      ctx.throw(433, '操作的数据不存在');
    }

    const cmd = 'whitelist';
    const { type, ip, port, protocol, comment } = params;
    const args = ['set', id, type, ip, port, protocol, comment || ''];

    return ctx.service.base.execSync(cmd, args);
  }

  async query(query) {
    const { ctx } = this;
    const where = {};
    const Op = ctx.app.Sequelize.Op;
    query.type && (where.type = query.type);
    query.ip && (where.ip = { [Op.substring]: `${query.ip}` });
    query.comment && (where.comment = { [Op.substring]: `${query.comment}` });

    const attrs = ['id', 'type', 'ip', 'port', 'protocol', 'comment'];
    const pageParams = {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    };

    return await ctx.service.base.page(
      where,
      pageParams,
      'Whitelist',
      attrs,
      'configModel'
    );
  }

  async del(id) {
    const { ctx } = this;
    if (!id) {
      ctx.throw(433, '缺少id参数');
    }

    const object = await ctx.configModel.Whitelist.findByPk(id);

    if (!object) {
      ctx.throw(433, '操作的数据不存在');
    }

    const result = ctx.service.base.execSync('whitelist', ['del', id]);
    if (!result.error) {
      return await object.destroy();
    }
  }
}

module.exports = WhitelistService;
