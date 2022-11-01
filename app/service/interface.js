'use strict';

const Service = require('egg').Service;

class InterfaceService extends Service {
  // 获取接口IP
  async ip() {
    const { ctx } = this;
    const cmd = '/usr/local/bin/sysip';
    let result = ctx.service.base.execSync(cmd);
    result = result && result.stdout && result.stdout.replace(/\n/g, '');
    result = result ? result.split(',') : [];
    result = result.map((item) => ({
      ip: item,
    }));
    return result;
  }
}

module.exports = InterfaceService;
