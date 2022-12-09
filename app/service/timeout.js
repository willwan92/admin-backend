'use strict';

const Service = require('egg').Service;

class TimeoutService extends Service {
  async get() {
    const { ctx } = this;

    const object = await ctx.configModel.Timeout.findByPk(1);

    if (!object) {
      ctx.throw(500, '获取的数据不存在');
    }

    return {
      timeout: object.timeout,
    };
  }

  async update(data) {
    const { ctx } = this;
    const object = await ctx.configModel.Timeout.findByPk(1);

    if (!object) {
      ctx.throw(500, '操作的数据不存在');
    }

    return await object.update(data);
  }
}

module.exports = TimeoutService;
