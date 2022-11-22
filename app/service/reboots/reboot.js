'use strict';

const Service = require('egg').Service;

class rebootService extends Service {
  reboot() {
    const { ctx } = this;
    let result = ctx.service.base.execSync('/usr/local/bin/reboot');
    if (result.status !== 0) {
      this.ctx.throw(455, `重启失败（detail：${result.stdout || ''}）`);
    }
  }

  halt() {
    const { ctx } = this;
    let result = ctx.service.base.execSync('/usr/local/bin/halt');
    if (result.status !== 0) {
      this.ctx.throw(455, `关机失败（detail：${result.stdout || ''}）`);
    }
  }
}
module.exports = rebootService;
