'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;

class FileService extends Service {
  async upload(fileStream) {
    const { ctx } = this;
    try {
      // 上传文件存储目录
      const DirPath = '/tmp/';
      //  创建目录确保目录的存在。如果目录结构不存在,就创建一个。
      await fsExtra.ensureDir(DirPath);
      const target = path.join(DirPath, fileStream.filename);
      const writeStream = fs.createWriteStream(target);
      await awaitWriteStream(fileStream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(fileStream);
      ctx.throw(500, `上传文件失败（detail: ${err.message}）`);
    }
  }
  async upload_pkg(fileStream) {
    const { ctx } = this;
    try {
      // 上传文件存储目录
      const DirPath = '/tmp/update/';
      //  创建目录确保目录的存在。如果目录结构不存在,就创建一个。
      await fsExtra.ensureDir(DirPath);
      const target = path.join(DirPath, "sysupdate.pkg");
      const writeStream = fs.createWriteStream(target);
      await awaitWriteStream(fileStream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(fileStream);
      ctx.throw(500, `上传文件失败（detail: ${err.message}）`);
    }
  }
}

module.exports = FileService;
