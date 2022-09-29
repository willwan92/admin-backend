'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(data = null) {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data,
    };
  }

  async message(message = '') {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      message,
    };
  }

  async error(message = '服务器发生错误', code = -1) {
    const { ctx } = this;
    ctx.body = {
      code,
      message,
    };
  }
}

module.exports = BaseController;
