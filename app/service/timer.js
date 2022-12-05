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
  async clock(data) {
    const { ctx } = this;
    const object = await ctx.configModel.Timer.findByPk(1);
    if (!object) {
        ctx.throw(433, '操作的数据不存在');
      }
    const { server, period, start } = data;
    const cmd = '/usr/local/bin/sys_time';
    const args = ['clock',server,period,start];
    const result = ctx.service.base.execSync(cmd, args);
    if (!result.error) {
        return await object.update(data);
      }
  }

  async query() {
    const { ctx } = this;
    const attrs = ['id', 'server', 'period', 'start'];
    const rows = await ctx.configModel.Timer.findAll({
        attrs,
      });
     return rows[0];
  }
}


module.exports = timerService;
