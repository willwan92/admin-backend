'use strict';

const Service = require('egg').Service;
const child_process = require('child_process');
const svgCaptcha = require('svg-captcha');

class BaseService extends Service {
  /**
   * 分页查询数据
   * @param where 查询参数 Object
   * @param pageParams 分页参数 { pageNo, pageSize }
   * @param table 查询的表名 String
   * @param attributes 可选。要查询的属性（字段）Array
   * @param model 可选。模型（数据库）名称 String
   * @return
   */
  async page(where, pageParams, table, attributes = null, model = 'model') {
    try {
      const limit = pageParams.pageSize ? Number(pageParams.pageSize) : 10;
      const offset = pageParams.pageNo
        ? (pageParams.pageNo - 1) * limit - 1
        : 0;

      const { count, rows } = await this.ctx[model][table].findAndCountAll({
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
   * 同步执行命令
   * @param {String} cmd 要执行的命令
   * @param {Array} args 执行命令的参数
   * @return {Object} 成功返回Object对象，失败记录日志并抛出异常
   */
  execSync(cmd, args = []) {
    const result = child_process.spawnSync(cmd, args, { encoding: 'utf-8' });
    if (result.error) {
      // 执行失败并抛出错误
      this.ctx.logger.error(result.error);
      this.ctx.throw(500, '服务器错误');
    }

    return result;
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
      [type, level, hostip, username, message],
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
      color: true,
      background: '#ccc',
    });

    return captcha;
  }
}

module.exports = BaseService;
