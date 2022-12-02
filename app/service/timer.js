'use strict';

const Service = require('egg').Service;

class timerService extends Service {
  async settime(params) {
    const { ctx } = this;
    const { date, time } = params;
    const cmd = '/bin/date';
    const time_str = '\"' + date + ' ' + time + '\"';
    const args = ['-s',time_str];
    return ctx.service.base.execSync(cmd, args);
  }
}

module.exports = timerService;
