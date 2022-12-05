'use strict';

const BaseController = require('./base');
const fs = require('fs');
const path = require('path');

/**
 * @controller file 文件管理接口
 */
class FileController extends BaseController {
  /**
   * @summary 上传文件(默认/tmp/下)
   * @description
   * @router post /file/upload
   * @request formData file *file 要上传的文件
   * @response 200 baseResponse successed
   */
  async upload() {
    const { ctx } = this;
    // 获取文件流
    const fileStream = await ctx.getFileStream();
    await ctx.service.file.upload(fileStream);
    this.message('文件上传成功');
  }

  /**
   * @summary 上传文件（/etc/pki/tmp/下）
   * @description
   * @router post /file/upload_pki/
   * @request formData file *file 要上传的文件
   * @response 200 baseResponse successed
   */
   async upload_pki() {
    const { ctx } = this;
    const fileStream = await ctx.getFileStream();
    await ctx.service.file.upload_pki(fileStream);
    this.message('文件上传成功');
  }

  /**
   * @summary 上传密钥备份文件
   * @description
   * @router post /file/upload/KeyBackupFile
   * @request formData file *file 密钥备份文件
   * @response 200 baseResponse successed
   */
  async uploadKeyBackupFile() {
    const { ctx } = this;
    // 获取文件流
    const fileStream = await ctx.getFileStream();
    if (fileStream.filename !== 'encryption_card_data') {
      ctx.throw(422, '密钥备份文件名称错误');
    }
    await ctx.service.file.upload(fileStream);
    this.message('文件上传成功');
  }

  /**
   * @summary 上传升级包文件
   * @description
   * @router post /file/upload/PackFile
   * @request formData file *file 升级包文件
   * @response 200 baseResponse successed
   */
   async uploadPackFile() {
    const { ctx } = this;
    // 获取文件流
    const fileStream = await ctx.getFileStream();
    if (fileStream.filename.substring(fileStream.filename.lastIndexOf('.') + 1) !== 'pkg') {
      ctx.throw(422, '升级包文件名格式错误,必须为pkg文件');
    }
    await ctx.service.file.upload_pkg(fileStream);
    this.message('文件上传成功');
  }

  /**
   * @summary 下载文件
   * @description
   * @router get /file/download/{filename}
   * @request path string *filename 要下载的文件名称（密钥备份文件：encryption_card_data）
   * @response 200
   */
  async download() {
    const { ctx } = this;
    // 可供下载文件存储目录
    const DirPath = '/tmp/';
    const filename = ctx.params.filename;
    const files = fs.readdirSync(DirPath);

    if (!files.includes(filename)) {
      ctx.status = 404;
    }
    this.ctx.attachment(filename);
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = fs.createReadStream(path.join(DirPath, filename));
  }
}

module.exports = FileController;
