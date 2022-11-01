'use strict';

const Service = require('egg').Service;

class ServerService extends Service {
  // 添加服务
  async create(params) {
    const { ctx } = this;
    const cmd = '/usr/local/bin/kdmcserver';
    const { id, ip, port, type } = params;
    return ctx.service.base.execSync(cmd, ['add', id, ip, port, type]);
  }

  // 查询服务
  async query(query) {
    const { ctx } = this;
    const where = {};
    const Op = ctx.app.Sequelize.Op;
    query.ip && (where.ip = { [Op.substring]: `${query.ip}` });
    query.port && (where.port = { [Op.substring]: `${query.port}` });
    query.status && (where.status = query.status);

    const attrs = ['id', 'ip', 'port', 'type'];
    const pageParams = {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    };

    return await ctx.service.base.page(
      where,
      pageParams,
      'KdmcServer',
      attrs,
      'ipencModel'
    );
  }

  // 删除服务
  async del(id) {
    const { ctx } = this;
    if (!id) {
      ctx.throw(433, '参数错误');
    }

    const cmd = '/usr/local/bin/kdmcserver';
    return ctx.service.base.execSync(cmd, ['del', id]);
  }
}

module.exports = ServerService;
