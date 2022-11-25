'use strict';
const Service = require('egg').Service;

class IfaddrService extends Service {
  async create(params) {
    const { ctx } = this;
    const { ifname, ip, netmask, ping, admin } = params;
    const cmd = 'ifaddr';
    const args = ['add', ifname,ip,netmask,'ping',ping,'admin',admin];
    return ctx.service.base.execSync(cmd, args);
  }
  async query(query) {
    const { ctx } = this;
    const where = {};
    const Op = ctx.app.Sequelize.Op;
    query.ifname && (where.interface = query.ifname);
    query.ip && (where.ip = { [Op.substring]: `${query.ip}` });
    const attrs = ['interface', 'ip', 'mask', 'ping', 'admin'];
    const pageParams = {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    };

    return await ctx.service.base.page(
      where,
      pageParams,
      'Fwips',
      attrs,
      'networkModel'
    );
  }
  async del(ip) {
    const { ctx } = this;
    const mnglog = ctx.service.base.mnglog;
    if (!ip) {
      ctx.throw(433, '缺少ip参数');
    }

    const object = await ctx.networkModel.Fwips.findOne({
        where:{ ip },
    });

    if (!object) {
      ctx.throw(433, '操作的数据不存在');
    }
    const logmsg = '删除接口地址:' + ip;
    mnglog(6,logmsg);
    const result = ctx.service.base.execSync('ifaddr', ['del', ip]);
    if (!result.error) {
      return await object.destroy();
    }
  }
}

module.exports = IfaddrService;
