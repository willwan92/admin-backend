'use strict';

const Service = require('egg').Service;
const child_process = require('child_process');

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
    const limit = pageParams.pageSize ? Number(pageParams.pageSize) : 10;
    const offset = pageParams.pageNo ? (pageParams.pageNo - 1) * limit - 1 : 0;

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
}

module.exports = BaseService;
