'use strict';

const Service = require('egg').Service;

class MngcardService extends Service {
  create() {
    const { ctx } = this;
    const { name, keyser, password } = ctx.request.body;
    const result = ctx.service.base.execSync('/usr/local/bin/mngcard', [
      'add',
      name,
      keyser,
      password,
    ]);

    if (result.status !== 0) {
      this.ctx.throw(455, `添加管理卡失败（detail：${result.stdout || ''}）`);
    }
  }

  updatePassword() {
    const { ctx } = this;
    const { keyser, oldPassword, newPassword } = ctx.request.body;
    const result = ctx.service.base.execSync('/usr/local/bin/mngcard', [
      'set',
      keyser,
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

  auth() {
    const { ctx } = this;
    const { keyser, password } = ctx.request.body;
    const result = ctx.service.base.execSync('/usr/local/bin/mngcard', [
      'auth',
      keyser,
      password,
    ]);

    if (result.status !== 0) {
      this.ctx.throw(455, `管理卡认证失败（detail：${result.stdout || ''}）`);
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
        `管理卡退出登录失败（detail：${result.stdout || ''}）`
      );
    }
  }
}

module.exports = MngcardService;
