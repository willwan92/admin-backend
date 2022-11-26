'use strict';

const Service = require('egg').Service;

class LogService extends Service {
  async query(queryParams) {
    const { ctx } = this;
    const where = {};
    const Op = ctx.app.Sequelize.Op;
    queryParams.date && (where.date = { [Op.substring]: `${queryParams.date}` });
    queryParams.user && (where.user = { [Op.substring]: `${queryParams.user}` });
    queryParams.sip && (where.sip = { [Op.substring]: `${queryParams.sip}` });
    queryParams.msg && (where.msg = { [Op.substring]: `${queryParams.msg}` });
    queryParams.pri && (where.pri = queryParams.pri);
    queryParams.type && (where.type = queryParams.type);
    const attrs = ['date', 'user', 'sip', 'pri', 'type', 'msg'];
    const pageParams = {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    };

    return await ctx.service.base.page(
      where,
      pageParams,
      'Log',
      attrs,
      'logModel'
    );

  }
}

module.exports = LogService;
