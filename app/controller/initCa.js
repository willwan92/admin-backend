'use strict';

const BaseController = require('./base');

/**
 * @controller initCa 证书初始化接口
 */
class InitCaController extends BaseController {
  /**
   * @summary 证书初始化
   * @description
   * @router post /initCa
   * @request body initCaRequest *body
   * @response 200 baseResponse successed
   */
  initCa() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.validate(ctx.rule.initCaRequest, params);
    ctx.service.initCa.init(params);
    this.message('证书初始化成功');
  }

  /**
   * @summary CA证书信息
   * @description CA证书详细信息
   * @router get /cacert/show
   * @response 200 caCertResponse successed
   */
 async query() {
  const { ctx } = this;
  const query = ctx.request.query;
  const result = await ctx.service.initCa.query(query);
  this.success(result);
}
/**
   * @summary 初始化进度
   * @description addcard1：管理卡1未添加，界面应跳转到管理卡1添加处，依次类推会提示addcard2、addcard3、addcard4、addcard5、addcard6，addcard6代表操作员卡,logincard1：管理卡1未登录，界面应跳转到管理卡1登录处，依次类推会提示logincard2、logincard3、logincard4、logincard5、logincard6，logincard6代表操作员登录,cainit：证书未初始化,mnginit：未添加三种类型的管理员,success：初始化完成
   * @router get /initprogress
   * @response 200 initprogressResponse successed
   */
 async initprogress() {
  const { ctx } = this;
  const result = await ctx.service.initCa.initprogress();
  this.success(result);
}
}

module.exports = InitCaController;
