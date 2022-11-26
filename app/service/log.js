'use strict';

const Service = require('egg').Service;

class LogService extends Service {
  async query(queryParams) {
    const { ctx } = this;
    const where = {};
    const Op = ctx.app.Sequelize.Op;
    query.date && (where.date = { [Op.substring]: `${query.date}` });
    query.user && (where.user = { [Op.substring]: `${query.user}` });
    query.sip && (where.sip = { [Op.substring]: `${query.sip}` });
    query.msg && (where.msg = { [Op.substring]: `${query.msg}` });
    query.pri && (where.pri = query.pri);
    query.type && (where.type = query.type);
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
