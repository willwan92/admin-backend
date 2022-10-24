'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  /**
   * 执行首页相关的后台命令
   * @param {string} cmd
   * @return 返回命令的输出内容转换后的json对象
   */
  execHomeCmd(cmd) {
    const { stdout } = this.service.base.execSync(cmd);
    try {
      return JSON.parse(stdout);
    } catch (error) {
      this.ctx.throw(error);
    }
  }
}

module.exports = HomeService;
