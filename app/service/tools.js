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
      background: 'pink',
    });

    return captcha;
  }

  exec(cmd) {
    return new Promise((resolve, reject) => {
      child_process.exec(cmd, (err, stdout) => {
        if (err) {
          reject(new Error(`exec error: ${err}`));
        } else {
          resolve(stdout);
        }
      });
    });
  }
}

module.exports = ToolsService;
