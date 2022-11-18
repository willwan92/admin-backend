'use strict';

const Service = require('egg').Service;

class SysupdateService extends Service {
  update() {
    const { ctx } = this;
    let result = ctx.service.base.execSync('/usr/local/bin/update.sh');
    if (result.status !== 0) {
      this.ctx.throw(455, `升级失败（detail：${result.stdout || ''}）`);
    }
  }

  async query(query) {
    const { ctx } = this;
    const where = {};
    const Op = ctx.app.Sequelize.Op;
    query.version && (where.version = { [Op.substring]: `${query.version}` });
    query.des && (where.des = { [Op.substring]: `${query.des}` });
    const attrs = ['id', 'time', 'version', 'des'];
    const pageParams = {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    };

    return await ctx.service.base.page(
      where,
      pageParams,
      'Updatehis',
      attrs,
      'sysupdateModel'
    );
  }
}

module.exports = SysupdateService;
