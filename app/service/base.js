'use strict';

const Service = require('egg').Service;
const child_process = require('child_process');
const svgCaptcha = require('svg-captcha');
const fs = require('fs');

class BaseService extends Service {
  /**
   * 分页查询数据
   * @param where 查询参数 Object
   * @param pageParams 分页参数 { pageNo, pageSize }
   * @param modelName 模型名称 String
   * @param attributes 可选。要查询的属性（字段）Array
   * @param delegate 可选。数据库对应的delegate名称 String
   * @return
   */
  async page(
    where,
    pageParams,
    modelName,
    attributes = null,
    delegate = 'model'
  ) {
    try {
      const limit = pageParams.pageSize ? Number(pageParams.pageSize) : 10;
      const offset = pageParams.pageNo
        ? (pageParams.pageNo - 1) * limit - 1
        : 0;

      const { count, rows } = await this.ctx[delegate][
        modelName
      ].findAndCountAll({
        where,
        limit,
        offset,
        attributes,
      });

      return {
        total: count,
        data: rows,
        pageNo: pageParams.pageNo || 1,
        pageSize: pageParams.pageSize || 10,
      };
    } catch (error) {
      this.ctx.logger.error(error);
      this.ctx.throw(500, '服务器错误');
    }
  }

  /**
   * 分页查询数据
   * @param where 查询参数 Object
   * @param pageParams 分页参数 { pageNo, pageSize }
   * @param modelName 模型名称 String
   * @param attributes 可选。要查询的属性（字段）Array
   * @param order 可选。排序方法
   * @param delegate 可选。数据库对应的delegate名称 String
   * @return
   */
  async orderpage(
    where,
    pageParams,
    modelName,
    attributes = null,
    order,
    delegate = 'model'
  ) {
    try {
      const limit = pageParams.pageSize ? Number(pageParams.pageSize) : 10;
      const offset = pageParams.pageNo
        ? (pageParams.pageNo - 1) * limit - 1
        : 0;

      const { count, rows } = await this.ctx[delegate][
        modelName
      ].findAndCountAll({
        where,
        limit,
        offset,
        attributes,
        order,
      });
      return {
        total: count,
        data: rows,
        pageNo: pageParams.pageNo || 1,
        pageSize: pageParams.pageSize || 10,
      };
    } catch (error) {
      this.ctx.logger.error(error);
      this.ctx.throw(500, '服务器错误');
    }
  }

  /**
   * 查询全部数据
   * @param modelName 模型名称 String
   * @param attributes 可选。要查询的属性（字段）Array
   * @param delegate 可选。数据库对应的delegate名称 String
   * @return
   */
  async nopage(modelName, attributes = null, delegate = 'model') {
    try {
      const rows = await this.ctx[delegate][modelName].findAll({
        attributes,
      });

      return {
        data: rows,
      };
    } catch (error) {
      this.ctx.logger.error(error);
      this.ctx.throw(500, '服务器错误');
    }
  }

  /**
   * 同步执行命令
   * @param {String} cmd 要执行的命令
   * @param {Array} args 执行命令的参数
   * @return {Object} 成功返回Object对象，失败记录日志并抛出异常
   */
  execSync(cmd, args = []) {
    var cmdstr = '';
    for (var i = 0; i < args.length; i++) {
      cmdstr += args[i] + ' ';
    }
    fs.appendFile(
      '/tmp/nodejs.cmd.txt',
      cmd + ' ' + cmdstr + '\n',
      function (err) {
        if (err) {
          return console.log('命令记录失败' + err.message);
        }
      }
    );
    const result = child_process.spawnSync(cmd, args, { encoding: 'utf-8' });
    const stdout = result.stdout ? result.stdout.toLocaleLowerCase() : '';
    if (result.error) {
      // 执行失败并抛出错误
      this.ctx.logger.error(result.error);
      this.ctx.throw(500, '服务器错误');
    } else if (
      stdout &&
      (stdout.includes('错误') || stdout.includes('error'))
    ) {
      this.ctx.throw(455, result.stdout);
    }

    return result;
  }

  /**
   * 异步步执行命令
   * @param {String} cmd 要执行的命令
   * @param {Array} args 执行命令的参数
   * @return {Object} 成功返回Object对象，失败记录日志并抛出异常
   */
  execAsync(cmd, args = []) {
    var cmdstr = '';
    for (var i = 0; i < args.length; i++) {
      cmdstr += args[i] + ' ';
    }
    fs.appendFile(
      '/tmp/nodejs.cmd.txt',
      cmd + ' ' + cmdstr + '\n',
      function (err) {
        if (err) {
          return console.log('命令记录失败' + err.message);
        }
      }
    );
    return new Promise((resolve, reject) => {
      const result = child_process.spawn(cmd, args, { encoding: 'utf-8' });

      result.stdout.on('data', (data) => {
        let stdout = data.toString();
        stdout = stdout ? stdout.toLocaleLowerCase() : '';
        // 去掉打印的换行符
        stdout = stdout.replace(/\n/g, '');

        if (stdout && (stdout.includes('错误') || stdout.includes('error'))) {
          reject(stdout);
        }

        if (stdout === '0') {
          resolve(stdout);
        } else {
          reject(stdout);
        }
      });

      result.stderr.on('data', (data) => {
        // 执行失败并抛出错误
        this.ctx.logger.error(`执行失败，详情：${data}`);
        this.ctx.throw(500, `服务器错误，详情：${data}`);
      });

      result.on('close', (code) => {
        // 执行失败并抛出错误
        this.ctx.logger.error(`执行失败，退出码：${code}`);
      });
    });
  }

  /**
   * 记录系统日志
   * @param {int} type 日志类型：2（设备管理日志）
   * @param {int} level 日志级别：4 warning（警告）6 info（通知）
   * @param {string} message 日志信息
   * @param {string} username 管理员名称
   * @return {any} 成功返回0或命令输出，失败记录日志
   */
  syslog(type, level, message, username = '') {
    const hostip = this.ctx.request.ip;
    const _username = username || this.ctx.session.username;
    const ret = child_process.spawnSync(
      '/usr/local/bin/syslog',
      [type, level, hostip, _username, message],
      { encoding: 'utf-8' }
    );
    if (ret.status !== 0) {
      this.ctx.logger.error(ret.error);
      this.ctx.throw(500, '服务器内部错误');
    } else {
      return ret.stdout || 0;
    }
  }
  /**
   *设备管理日志记录
   */
  mnglog(level, message) {
    //const hostip = this.ctx.request.ip; //这里为什么提示ctx未定义
    const hostip = '1.1.1.1';
    const user = 'admin';
    const ret = child_process.spawnSync(
      '/usr/local/bin/syslog',
      [2, level, hostip, user, message],
      { encoding: 'utf-8' }
    );
    if (ret.status !== 0) {
      this.ctx.logger.error(ret.error);
      this.ctx.throw(500, '服务器内部错误');
    } else {
      return ret.stdout || 0;
    }
  }

  /**
   * 生成图片验证码
   */
  createCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      noise: 2,
      color: false,
      background: '#999',
    });

    return captcha;
  }
}

module.exports = BaseService;
