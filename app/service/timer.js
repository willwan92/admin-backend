'use strict';

const Service = require('egg').Service;

class timerService extends Service {
  async settime(params) {
    const { ctx } = this;
    const { date, time } = params;
    const cmd = '/usr/local/bin/sys_time';
    const args = ['set',date,time];
    return ctx.service.base.execSync(cmd, args);
  }
}

module.exports = timerService;
