'use strict';

const Service = require('egg').Service;

class InitKeyService extends Service {
  init() {
    const { ctx } = this;
    // 密码卡初始化
    let result = ctx.service.base.execSync('/usr/local/bin/cardinit');
    if (result.status !== 0) {
      this.ctx.throw(455, `添加管理卡失败（detail：${result.stdout || ''}）`);
    }

    // 生成设备密钥
    result = ctx.service.base.execSync('/usr/local/bin/keymng', [
      'insert',
      'ecc',
      99,
    ]);
    if (result.status !== 0) {
      this.ctx.throw(455, `添加管理卡失败（detail：${result.stdout || ''}）`);
    }

    // 生成设备密钥
    result = ctx.service.base.execSync('/usr/local/bin/keymng', [
      'insert',
      'ecc',
      100,
    ]);
    if (result.status !== 0) {
      this.ctx.throw(455, `添加管理卡失败（detail：${result.stdout || ''}）`);
    }
  }
}

module.exports = InitKeyService;
