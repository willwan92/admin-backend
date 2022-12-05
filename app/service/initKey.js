'use strict';

const Service = require('egg').Service;

class InitKeyService extends Service {
  init() {
    const { ctx } = this;
    // 密码卡初始化
    let result = ctx.service.base.execSync('/usr/local/bin/cardinit');
    if (result.status !== 0) {
      const logmsg = "密码卡初始化失败！";
      ctx.service.base.syslog(2, 4, logmsg, '');
      this.ctx.throw(455, `设备密钥初始化失败（detail：${result.stdout || ''}）`);
    }
    else{
      const logmsg = "密码卡初始化成功！";
      ctx.service.base.syslog(2, 6, logmsg, '');
    }

    // 生成设备密钥
    result = ctx.service.base.execSync('/usr/local/bin/keymng', [
      'insert',
      'ecc',
      99,
    ]);
    if (result.status !== 0) {
      this.ctx.throw(455, `设备密钥初始化失败（detail：${result.stdout || ''}）`);
    }
    else{
      const logmsg = "ECC密钥初始化成功！";
      ctx.service.base.syslog(2, 6, logmsg, '');
    }

    // 生成设备密钥
    result = ctx.service.base.execSync('/usr/local/bin/keymng', [
      'insert',
      'ecc',
      100,
    ]);
    if (result.status !== 0) {
      this.ctx.throw(455, `设备密钥初始化失败（detail：${result.stdout || ''}）`);
    }
    else{
      const logmsg = "对称密钥初始化成功！";
      ctx.service.base.syslog(2, 6, logmsg, '');
    }
  }

  async setpin(params) {
    const { ctx } = this;
    const { keyid, pin } = params;
    const cmd = '/usr/local/bin/keymng';
    const args = ['setpin', keyid,pin];
    const logmsg = "设置密钥访问控制码，密钥索引："+keyid;
    ctx.service.base.syslog(2, 6, logmsg, '');
    return ctx.service.base.execSync(cmd, args);
  }
}

module.exports = InitKeyService;
