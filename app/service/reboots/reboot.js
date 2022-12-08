'use strict';

const Service = require('egg').Service;

class rebootService extends Service {
  reboot() {
    const { ctx } = this;
    let result = ctx.service.base.execSync('/usr/local/bin/reboot');
    if (result.status !== 0) {
      ctx.service.base.syslog(2, 4, '重启命令执行失败！', '');
      this.ctx.throw(455, `重启失败（detail：${result.stdout || ''}）`);
    }
    else{
      ctx.service.base.syslog(2, 6, '重启命令执行成功！', '');
    }
  }

  halt() {
    const { ctx } = this;
    let result = ctx.service.base.execSync('/usr/local/bin/halt');
    if (result.status !== 0) {
      ctx.service.base.syslog(2, 4, '关机命令执行失败！', '');
      this.ctx.throw(455, `关机失败（detail：${result.stdout || ''}）`);
    }
    else{
      ctx.service.base.syslog(2, 6, '关机命令执行成功！', '');
    }
  }
}
module.exports = rebootService;
