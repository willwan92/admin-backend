'use strict';

const Service = require('egg').Service;

class ServerService extends Service {
  // 添加服务
  async create(params) {
    const { ctx } = this;
    const cmd = '/usr/local/bin/kdmcserver';
    const { ip, port, type } = params;

    // 模型若为下划线方式命名会自动转为大驼峰命名，使用模型时注意要使用对应的大驼峰命名
    const pserver = await ctx.ipencModel.KdmcServer.findOne({
      where: { ip,port },
    });
    if (pserver) {
      ctx.throw(433, '记录已存在！请重新输入');
    }

    const server = await ctx.ipencModel.KdmcServer.create(params);
    const result = ctx.service.base.execAsync(cmd, [
      'add',
      server.id,
      ip,
      port,
      type,
    ]);

    if (result.error) {
      await server.destory();
    }
  }

  // 查询服务
  async query(query) {
    const { ctx } = this;
    const where = {};
    const Op = ctx.app.Sequelize.Op;
    query.ip && (where.ip = { [Op.substring]: `${query.ip}` });
    query.port && (where.port = { [Op.substring]: `${query.port}` });
    query.type && (where.type = { [Op.substring]: `${query.type}` });
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

    const server = await ctx.ipencModel.KdmcServer.findByPk(id);
    if (!server) {
      ctx.throw(433, '操作的数据不存在');
    }

    const cmd = '/usr/local/bin/kdmcserver';
    const result = ctx.service.base.execSync(cmd, ['del', id]);
    if (!result.error) {
      return await server.destroy();
    }
  }
}

module.exports = ServerService;
