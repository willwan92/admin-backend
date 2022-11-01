'use strict';

const Service = require('egg').Service;

class InterfaceService extends Service {
  // 获取接口IP
  async ip() {
    const { ctx } = this;
    const cmd = '/usr/local/bin/sysip';
    let result = ctx.service.base.execSync(cmd);
    result = result ? result.split(',') : [];
    return result;
  }
}

module.exports = InterfaceService;
