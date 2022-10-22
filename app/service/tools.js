'use strict';

const Service = require('egg').Service;
const child_process = require('child_process');
const svgCaptcha = require('svg-captcha');

class ToolsService extends Service {
  captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      noise: 2,
      color: true,
      background: '#ccc',
    });

    return captcha;
  }

  exec(cmd) {
    return new Promise((resolve, reject) => {
      child_process.exec(cmd, (err, stdout) => {
        if (err) {
          this.ctx.logger.error(err);
          reject(new Error('系统错误，请稍后再试'));
        } else {
          resolve(stdout);
        }
      });
    });
  }

  /**
   * 记录系统日志
   * @param {int} type 日志类型：2（设备管理日志）
   * @param {int} level 日志级别：4 warning（警告）6 info（通知）
   * @param {string} hostip 客户端主机IP
   * @param {string} username 管理员名称
   * @param {string} message 日志信息
   * @return {any} 成功返回0或命令输出，失败记录日志
   */
  syslog(type, level, hostip, username, message) {
    const ret = child_process.spawnSync(
      '/usr/local/bin/syslog',
      [ type, level, hostip, username, message ],
      { encoding: 'utf-8' }
    );
    if (ret.status !== 0) {
      this.ctx.logger.error(ret.error);
      this.ctx.throw(500, '服务器内部错误');
    } else {
      return ret.stdout || 0;
    }
  }
}

module.exports = ToolsService;
