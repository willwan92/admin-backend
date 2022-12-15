'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

class LogService extends Service {
  async query(queryParams) {
    const { ctx } = this;
    const where = {};
    const Op = ctx.app.Sequelize.Op;
    //queryParams.startDate && queryParams.endDate (where.date >= queryParams.startDate && where.date <= queryParams.endDate);
    queryParams.startDate &&
    queryParams.endDate &&
      (where.date = {
        [Op.between]: [
          new Date(queryParams.startDate),
          new Date(queryParams.endDate),
        ],
      });

    //queryParams.endDate && (where.date <= queryParams.endDate);
    queryParams.user && (where.user = { [Op.substring]: `${queryParams.user}` });
    queryParams.sip && (where.sip = { [Op.substring]: `${queryParams.sip}` });
    queryParams.msg && (where.msg = { [Op.substring]: `${queryParams.msg}` });
    queryParams.pri && (where.pri = queryParams.pri);
    queryParams.type && (where.type = queryParams.type);
    const attrs = ['date', 'user', 'sip', 'pri', 'type', 'msg'];
    const order = [
      ['id', 'DESC']
    ];
    const pageParams = {
      pageNo: queryParams.pageNo,
      pageSize: queryParams.pageSize,
    };

    return await ctx.service.base.orderpage(
      where,
      pageParams,
      'Log',
      attrs,
      order,
      'logModel'
    );

  }

  export(logParams) {
    const { ctx } = this;
    const { type } = 0;
    //const { type } = ctx.request.body;
    logParams.type && (type = logParams.type);
    const result = ctx.service.base.execSync('/usr/local/bin/logexport', [
      logParams.type,logParams.startDate,logParams.endDate
    ]);
    if (result.status !== 0) {
      this.ctx.throw(
        455,
        `命令调用失败（detail：${result.stdout || ''}）`
      );
    }
    // 可供下载文件存储目录
    const DirPath = '/tmp/';
    const filename = "export.log";
    const files = fs.readdirSync(DirPath);

    if (!files.includes(filename)) {
      ctx.status = 404;
    }
    this.ctx.attachment(filename);
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = fs.createReadStream(path.join(DirPath, filename));


  }
}

module.exports = LogService;
