'use strict';

const Service = require('egg').Service;
const fs = require('fs');

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
    const logmsg = "ca证书初始化证书名称："+name;
    ctx.service.base.syslog(2, 6, logmsg, '');
    const result = ctx.service.base.execSync(
      '/usr/local/bin/pkism2',
      cmdParams
    );

    if (result.status !== 0) {
      this.ctx.throw(455, `证书初始化失败（detail：${result.stdout || ''}）`);
    }
  }

  importCa(params) {
    const { ctx } = this;
    const {
      certfile,
      keyfile,
      password,
    } = params;

    const cmdParams = [
      'import',
      'ca',
      'format',
      'PEM',
      'certfile',
      certfile,
      'keyfile',
      keyfile,
      'capasswd',
      password,
    ];
    const result = ctx.service.base.execSync(
      '/usr/local/bin/pkism2',
      cmdParams
    );

    if (result.status !== 0) {
      const logmsg = "ca证书导入失败，证书名称："+certfile;
      ctx.service.base.syslog(2, 4, logmsg, '');
      this.ctx.throw(455, `证书倒入失败（detail：${result.stdout || ''}）`);
    }
    else{
      const logmsg = "ca证书导入成功，证书名称："+certfile;
      ctx.service.base.syslog(2, 6, logmsg, '');
    }
  }

  exportCa() {
    const { ctx } = this;
    const cmdParams = ['export', 'ca', 'format', 'PEM'];
    const result = ctx.service.base.execSync('/usr/local/bin/pkism2',cmdParams);
    if (result.status !== 0) {
      //ctx.service.base.syslog(2, 4, 'ca证书导出失败！', '');
      this.ctx.throw(
        455,
        `命令调用失败（detail：${result.stdout || ''}）`
      );
    }
    else{
      ctx.service.base.syslog(2, 6, 'ca证书导出成功！', '');
    }
    // 可供下载文件存储目录
    const DirPath = '/tmp/download/';
    const filename = "cacert.cer";
    const files = fs.readdirSync(DirPath);

    if (!files.includes(filename)) {
      ctx.status = 404;
    }
    this.ctx.attachment(filename);
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = fs.createReadStream(path.join(DirPath, filename));
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

  async initprogress() {
    const { ctx } = this;
    const cmd = '/usr/local/bin/initprogress';
    let result = ctx.service.base.execSync(cmd);
    result = result && result.stdout && result.stdout.replace(/\n/g, '');
    const progress = '{\"progress\":' + '\"' + result + '\"' + '}';
    console.log(progress);
    try {
      return JSON.parse(progress);
    } catch (error) {
      this.ctx.throw(error);
    }
  }
}

module.exports = InitKeyService;
