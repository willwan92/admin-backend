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
      'lifetime',
      lifetime,
      'capasswd',
      password,
    ];

    state && cmdParams.push('state', state);
    city && cmdParams.push('city', city);
    organization && cmdParams.push('org', organization);
    depart && cmdParams.push('depart', depart);
    email && cmdParams.push('email', email);

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
