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

  async query(query) {
    const { ctx } = this;
    const where = {};
    //const Op = ctx.app.Sequelize.Op;
   
    //query.name && (where.name = { [Op.substring]: `${query.name}` });
    //query.version && (where.version = { [Op.substring]: `${query.version}` });

    const attrs = ['name', 'version','serial','issuer','subject','pubkey_alg','modulus','sign_alg','startdate','enddate'];
    const pageParams = {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    };

    return await ctx.service.base.nopage(
      'Pkicert',
      attrs,
      'pkiModel'
    );
  }
}

module.exports = InitKeyService;
