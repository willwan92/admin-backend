'use strict';

const Service = require('egg').Service;

class LogService extends Service {
  async query(queryParams) {
    const pageParams = {
      pageNo: queryParams.pageNo,
      pageSize: queryParams.pageSize,
    };
    const attrs = ['date', 'user', 'sip', 'pri', 'type', 'msg'];

    return this.ctx.service.base.page({}, pageParams, 'Log', attrs, 'logModel');
  }
}

module.exports = LogService;
