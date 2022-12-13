'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

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

  createCert(params) {
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
      'cert',
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
      const logmsg = "证书生成失败，证书名称："+name;
      ctx.service.base.syslog(2, 4, logmsg, '');
      this.ctx.throw(455, `证书生成失败（detail：${result.stdout || ''}）`);
    }
    else{
      const logmsg = "证书生成成功，证书名称："+name;
      ctx.service.base.syslog(2, 6, logmsg, '');
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
  //导入sm2证书
  importSm2(params) {
    const { ctx } = this;
    const {
      name,
      reqfile,
      password,
    } = params;

    const cmdParams = [
      'import',
      'certreq',
      'name',
      name,
      'format',
      'PEM',
      'reqfile',
      reqfile,
      'capasswd',
      password,
    ];
    const result = ctx.service.base.execSync(
      '/usr/local/bin/pkism2',
      cmdParams
    );

    if (result.status !== 0) {
      const logmsg = "sm2证书导入失败，证书名称："+name;
      ctx.service.base.syslog(2, 4, logmsg, '');
      this.ctx.throw(455, `证书倒入失败（detail：${result.stdout || ''}）`);
    }
    else{
      const logmsg = "sm2证书导入成功，证书名称："+name;
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
    const cmdrm = ['-rf', '/tmp/download/cacert.cer'];
    ctx.service.base.execSync('/usr/bin/rm',cmdrm);
  }
  //导出sm2证书
  exportCert(params) {
    const { ctx } = this;
    const cmdParams = ['export', 'cert',  params.name, 'format', 'PEM'];
    const result = ctx.service.base.execSync('/usr/local/bin/pkism2',cmdParams);
    if (result.status !== 0) {
      //ctx.service.base.syslog(2, 4, 'ca证书导出失败！', '');
      this.ctx.throw(
        455,
        `命令调用失败（detail：${result.stdout || ''}）`
      );
    }
    else{
      ctx.service.base.syslog(2, 6, '证书导出成功！', '');
    }
    // 可供下载文件存储目录
    const DirPath = '/tmp/download/';
    const filename = params.name+'.zip';
    const files = fs.readdirSync(DirPath);

    if (!files.includes(filename)) {
      ctx.status = 404;
    }
    this.ctx.attachment(filename);
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = fs.createReadStream(path.join(DirPath, filename));
    const rmfilename = '/tmp/download/' + filename;
    const cmdrm = ['-rf', rmfilename];
    ctx.service.base.execSync('/usr/bin/rm',cmdrm);
  }
  //导出吊销列表
  exportCrl() {
    const { ctx } = this;
    const cmdParams = ['export', 'crl', 'format', 'PEM'];
    const result = ctx.service.base.execSync('/usr/local/bin/pkism2',cmdParams);
    if (result.status !== 0) {
      this.ctx.throw(
        455,
        `命令调用失败（detail：${result.stdout || ''}）`
      );
    }
    else{
      ctx.service.base.syslog(2, 6, '导出crl成功！', '');
    }
    // 可供下载文件存储目录
    const DirPath = '/tmp/download/';
    const filename = "cacert.crl";
    const files = fs.readdirSync(DirPath);

    if (!files.includes(filename)) {
      ctx.status = 404;
    }
    this.ctx.attachment(filename);
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = fs.createReadStream(path.join(DirPath, filename));
    const cmdrm = ['-rf', '/tmp/download/cacert.crl'];
    ctx.service.base.execSync('/usr/bin/rm',cmdrm);
  }
  async query(query) {
    const { ctx } = this;
    const where = {};
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
  async sm2query(query) {
    const { ctx } = this;
    const where = {};
    const Op = ctx.app.Sequelize.Op;
    where.type = 2;
    query.name && (where.name = { [Op.substring]: `${query.name}` });
    //query.issuer && (where.issuer = { [Op.substring]: `${query.issuer}` });
    query.subject && (where.subject = { [Op.substring]: `${query.subject}` });
    const attrs = ['name', 'subject', 'startdate', 'enddate', 'method'];
    const pageParams = {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    };

    return await ctx.service.base.page(
      where,
      pageParams,
      'Sm2cert',
      attrs,
      'pkiModel'
    );
  }

  async crlquery() {
    const { ctx } = this;
    const attrs = ['version', 'lastupdate', 'nextupdate', 'issuer', 'signature','revoked_num'];
    const rows = await ctx.pkiModel.Crlcert.findAll({
        attrs,
      });
     return rows[0];
  }

  async del(name) {
    const { ctx } = this;
    if (!name) {
      ctx.throw(433, '参数错误');
    }
    const object = await ctx.pkiModel.Sm2cert.findByPk(name);
    if (!object) {
      ctx.throw(433, '操作的数据不存在');
    }
    const result = ctx.service.base.execSync('/usr/local/bin/pkism2', ['del','cert' ,name]);
    if (!result.error) {
      const logmsg = "证书删除成功，证书名称：" + name;
      ctx.service.base.syslog(2, 6, logmsg, '');
      return result;
    }
    else{
      const logmsg = "证书删除失败，证书名称：" + name;
      ctx.service.base.syslog(2, 4, logmsg, '');
    }
  }

  async revoke(params) {
    const { ctx } = this;
    const {
      name,
      password,
    } = params;

    const cmdParams = [
      'revoke',
      'cert',
      name,
      'capasswd',
      password,
    ];
    const result = ctx.service.base.execSync(
      '/usr/local/bin/pkism2',
      cmdParams
    );
    if (result.status !== 0) {
      const logmsg = "证书吊销失败，证书名称："+name;
      ctx.service.base.syslog(2, 4, logmsg, '');
      this.ctx.throw(455, `证书吊销失败（detail：${result.stdout || ''}）`);
    }
    else{
      const logmsg = "证书吊销成功，证书名称："+name;
      ctx.service.base.syslog(2, 6, logmsg, '');
    }
  }

  async releasecrl(params) {
    const { ctx } = this;
    const {
      password,
    } = params;

    const cmdParams = [
      'release',
      'crl',
      'capasswd',
      password,
    ];
    const result = ctx.service.base.execSync(
      '/usr/local/bin/pkism2',
      cmdParams
    );
    if (result.status !== 0) {
      const logmsg = "吊销列表发布失败";
      ctx.service.base.syslog(2, 4, logmsg, '');
      this.ctx.throw(455, `吊销列表发布失败（detail：${result.stdout || ''}）`);
    }
    else{
      const logmsg = "吊销列表发布成功";
      ctx.service.base.syslog(2, 6, logmsg, '');
    }
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
