'use strict';

const Service = require('egg').Service;

class InitKeyService extends Service {
  init() {
    const { ctx } = this;
    const {
      name,
      commonname,
      state,
      city,
      organization,
      depart,
      email,
      lifetime,
      password,
    } = ctx.request.body;

    const result = ctx.service.base.execSync('/usr/local/bin/pki', [
      'generate',
      'ca',
      name,
      commonname,
      state,
      city,
      organization,
      depart,
      email,
      lifetime,
      password,
    ]);

    if (result.status !== 0) {
      this.ctx.throw(455, `证书初始化失败（detail：${result.stdout || ''}）`);
    }
  }
}

module.exports = InitKeyService;
