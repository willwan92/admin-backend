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
   * @summary 本地生成私钥和证书
   * @description
   * @router post /createCert
   * @request body initCaRequest *body
   * @response 200 baseResponse successed
   */
    createCert() {
      const { ctx } = this;
      const params = ctx.request.body;
      ctx.validate(ctx.rule.initCaRequest, params);
      ctx.service.initCa.createCert(params);
      this.message('证书生成成功');
    }
  
   /**
   * @summary 导入ca证书
   * @description
   * @router post /importCa
   * @request body importCaRequest *body
   * @response 200 baseResponse successed
   */
    importCa() {
      const { ctx } = this;
      const params = ctx.request.body;
      ctx.validate(ctx.rule.importCaRequest, params);
      ctx.service.initCa.importCa(params);
      this.message('证书导入成功');
    }

     /**
   * @summary 导入sm2证书
   * @description
   * @router post /importSm2
   * @request body importSm2Request *body
   * @response 200 baseResponse successed
   */
    importSm2() {
      const { ctx } = this;
      const params = ctx.request.body;
      ctx.validate(ctx.rule.importSm2Request, params);
      ctx.service.initCa.importSm2(params);
      this.message('证书导入成功');
    }
   /**
   * @summary 导出ca证书
   * @description
   * @router get /exportCa
   * @response 200 baseResponse successed
   */
    exportCa() {
      const { ctx } = this;
      ctx.service.initCa.exportCa();
      this.message('导出成功');
    }

    /**
   * @summary 导出吊销列表
   * @description
   * @router get /exportCrl
   * @response 200 baseResponse successed
   */
     exportCrl() {
      const { ctx } = this;
      ctx.service.initCa.exportCrl();
      this.message('导出成功');
    }

    /**
   * @summary 导出sm2证书
   * @description
   * @router get /exportCert
    * @request query strint name 证书名称
   * @response 200 baseResponse successed
   */
     exportCert() {
      const { ctx } = this;
      const Params = ctx.request.query;
      ctx.service.initCa.exportCert(Params);
      this.message('导出成功');
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
   * @summary sm2证书列表
   * @description
   * @router get /sm2cert/show
   * @request query string name 证书名称
   * @request query string subject 主题
   * @request query integer pageNo 页码 默认 1
   * @request query integer pageSize 单页数量 默认 10
   * @response 200 sm2CertResponse successed
   */
 async sm2query() {
  const { ctx } = this;
  const query = ctx.request.query;
  const result = await ctx.service.initCa.sm2query(query);
  this.success(result);
}

/**
   * @summary 删除证书
   * @description
   * @router delete /delcert/{name}
   * @request path string name 证书名称
   * @response 200 baseResponse successed
   */
 async del() {
  const { ctx } = this;
  const name = ctx.params.name;
  await ctx.service.initCa.del(name);
  this.message('删除成功');
}

 /**
   * @summary 吊销证书
   * @description
   * @router post /revoke
   * @request body crlRequest *body
   * @response 200 baseResponse successed
   */
  revoke() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.validate(ctx.rule.crlRequest, params);
    ctx.service.initCa.revoke(params);
    this.message('吊销成功');
  }

  /**
   * @summary 发布吊销列表
   * @description
   * @router post /releasecrl
   * @request body pwdRequest *body
   * @response 200 baseResponse successed
   */
   releasecrl() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.validate(ctx.rule.pwdRequest, params);
    ctx.service.initCa.releasecrl(params);
    this.message('发布成功');
  }

  /**
   * @summary 吊销列表展示页面
   * @description
   * @router get /crlcert/show
   * @response 200 clockResponse successed
   */
   async crlquery() {
    const { ctx } = this;
    const result = await ctx.service.initCa.crlquery();
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
