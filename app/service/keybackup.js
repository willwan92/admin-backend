'use strict';

const Service = require('egg').Service;

class KeybackupService extends Service {
  async mngcardLogin(params) {
    const { ctx } = this;
    const { cardNum, password } = params;

    try {
      await ctx.service.base.execAsync('/usr/local/bin/rbwfile', [
        `login${cardNum}`,
        password,
      ]);
    } catch (error) {
      ctx.service.base.syslog(2, 4, '管理卡登陆错误', '');
      ctx.throw(455, `管理卡登录错误（detail: ${error}）`);
    }
  }

  async selectBackupType(params) {
    const { ctx } = this;
    const { type, password } = params;

    try {
      await ctx.service.base.execAsync('/usr/local/bin/rbwfile', [
        type,
        password,
      ]);
    } catch (error) {
      ctx.service.base.syslog(2, 4, '备份类型错误错误', '');
      ctx.throw(455, `选择备份类型失败（detail: ${error}）`);
    }
  }

  async mngcardBackup(params) {
    const { ctx } = this;
    const { cardNum, password } = params;

    try {
      await ctx.service.base.execAsync('/usr/local/bin/rbwfile', [
        `backup${cardNum}`,
        password,
      ]);
    } catch (error) {
      ctx.service.base.syslog(2, 4, '管理卡备份错误', '');
      ctx.throw(455, `管理卡备份错误（detail: ${error}）`);
    }
  }

  async restoreInit(params) {
    const { ctx } = this;
    const { password } = params;

    try {
      await ctx.service.base.execAsync('/usr/local/bin/rbwfile', [
        'restoreinit',
        password,
      ]);
    } catch (error) {
      ctx.service.base.syslog(2, 4, '密钥恢复错误', '');
      ctx.throw(455, `密钥恢复错误（detail: ${error}）`);
    }
  }

  async mngcardRestore(params) {
    const { ctx } = this;
    const { cardNum, password } = params;

    try {
      await ctx.service.base.execAsync('/usr/local/bin/rbwfile', [
        `restore${cardNum}`,
        password,
      ]);
    } catch (error) {
      ctx.service.base.syslog(2, 4, '管理卡恢复错误', '');
      ctx.throw(455, `管理卡恢复错误（detail: ${error}）`);
    }
  }
}

module.exports = KeybackupService;
