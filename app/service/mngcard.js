'use strict';

const Service = require('egg').Service;

class MngcardService extends Service {
  create() {
    const { ctx } = this;
    const { type, name, password, phone } = ctx.request.body;
    const result = ctx.service.base.execSync('/usr/local/bin/mngcard', [
      'add',
      type,
      name,
      password,
      phone,
    ]);

    if (result.status !== 0) {
      this.ctx.throw(455, `添加管理卡失败（detail：${result.stdout || ''}）`);
    }
  }

  updatePassword() {
    const { ctx } = this;
    const { oldPassword, newPassword } = ctx.request.body;
    const result = ctx.service.base.execSync('/usr/local/bin/mngcard', [
      'set',
      oldPassword,
      newPassword,
    ]);

    if (result.status !== 0) {
      this.ctx.throw(
        455,
        `修改管理卡密码失败（detail：${result.stdout || ''}）`
      );
    }
  }

  login() {
    const { ctx } = this;
    const { password } = ctx.request.body;
    const result = ctx.service.base.execSync('/usr/local/bin/mngcard', [
      'login',
      password,
    ]);

    if (result.status !== 0) {
      this.ctx.throw(455, `管理卡登录失败（detail：${result.stdout || ''}）`);
    }
  }

  logout() {
    const { ctx } = this;
    const result = ctx.service.base.execSync('/usr/local/bin/mngcard', [
      'clear',
      'login',
    ]);

    if (result.status !== 0) {
      this.ctx.throw(
        455,
        `管理卡注销登录失败（detail：${result.stdout || ''}）`
      );
    }
  }

  async query(query) {
    const { ctx } = this;
    const where = {};
    const Op = ctx.app.Sequelize.Op;
    query.name && (where.name = { [Op.substring]: `${query.name}` });
    query.usrtype && (where.usrtype = { [Op.substring]: `${query.usrtype}` });
    query.keyser && (where.keyser = { [Op.substring]: `${query.keyser}` });
    query.phone && (where.phone = { [Op.substring]: `${query.phone}` });
   
    const attrs = ['name', 'usrtype', 'keyser', 'phone', 'login'];
    const pageParams = {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    };

    return await ctx.service.base.page(
      where,
      pageParams,
      'Mngcardinit',
      attrs,
      'devinitModel'
    );
  }

  checkcard() {
    const { ctx } = this;
    const { type } = ctx.request.body;
    const result = ctx.service.base.execSync('/usr/local/bin/checkcard', [
      type,
    ]);

    if (result.status !== 0) {
      this.ctx.throw(
        455,
        `命令调用失败（detail：${result.stdout || ''}）`
      );
    }
  }
}

module.exports = MngcardService;
