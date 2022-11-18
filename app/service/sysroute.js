'use strict';

const Service = require('egg').Service;

class SysrouteService extends Service {
  async create(params) {
    const { ctx } = this;
    const { ip, mask, gwip, metric } = params;

    const object = await ctx.networkModel.Droute.findOne({
      where: {
        ip,
      },
    });

    if (object) {
      ctx.throw(433, `目的地址 ${ip} 已存在`);
    }

    const cmd = 'sysroute';
    const router = await ctx.networkModel.Droute.create(params);
    const args = ['add', ip, mask, gwip, metric];
    const result = ctx.service.base.execSync(cmd, args);
    if (result.error) {
        await router.destory();
      }
  }

  async query(query) {
    const { ctx } = this;
    const where = {};
    const Op = ctx.app.Sequelize.Op;
    query.ip && (where.ip = { [Op.substring]: `${query.ip}` });
    query.mask && (where.mask = { [Op.substring]: `${query.mask}` });
    query.gwip && (where.gwip = { [Op.substring]: `${query.gwip}` });
    const attrs = ['id', 'ip', 'mask', 'gwip', 'metric'];
    const pageParams = {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    };

    return await ctx.service.base.page(
      where,
      pageParams,
      'Droute',
      attrs,
      'networkModel'
    );
  }

  async del(id) {
    const { ctx } = this;
    if (!id) {
      ctx.throw(433, '参数错误');
    }

    const object = await ctx.networkModel.Droute.findByPk(id);

    if (!object) {
      ctx.throw(433, '操作的数据不存在');
    }

    const result = ctx.service.base.execSync('sysroute', ['del', object.ip,object.mask,object.gwip,object.metric]);
    if (!result.error) {
      return await object.destroy();
    }
  }
  
}

module.exports = SysrouteService;
