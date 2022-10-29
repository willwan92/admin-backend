'use strict';

const Service = require('egg').Service;

class InitKeyService extends Service {
  init(params) {
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
    } = params;

    const cmdParams = [
      'generate',
      'ca',
      'name',
      name,
      'cn',
      commonname,
      'state',
      state,
      'city',
      city,
      'org',
      organization,
      'depart',
      depart,
      'email',
      email,
      'lifetime',
      lifetime,
      'capasswd',
      password,
    ];

    const result = ctx.service.base.execSync(
      '/usr/local/bin/pkism2',
      cmdParams
    );

    if (result.status !== 0) {
      this.ctx.throw(455, `证书初始化失败（detail：${result.stdout || ''}）`);
    }
  }
}

module.exports = InitKeyService;
