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
          this.ctx.logger.error(err)
          reject('系统错误，请稍后再试')
        } else {
          resolve(stdout);
        }
      });
    });
  }

  /**
   * 记录系统日志
   * @param {Number} type 日志类型：2（设备管理日志）
   * @param {*} level 日志级别：4 warning（警告）6 info（通知）
   * @param {*} hostip 客户端主机IP
   * @param {*} username 管理员名称
   * @param {*} message 日志信息
   * @returns 
   */
  syslog(type, level, hostip, username, message) {
    const ret = child_process.spawnSync('/usr/local/bin/syslog', [type, level, hostip, username, message], { encoding: 'utf-8' });
    if (ret.status !== 0) {
      this.ctx.logger.error(ret.error);
    } else {
      return ret.stdout || 0;
    }
  }
}

module.exports = ToolsService;
