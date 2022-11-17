'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app });

  // 登录认证
  router.post('/auth/login', controller.auth.login);
  router.post('/auth/logout', controller.auth.logout);
  router.get('/auth/captcha', controller.auth.captcha);

  // 用户
  router.post('/users', controller.user.create);
  router.get('/users/:id', jwt, controller.user.get);
  router.delete('/users/:id', controller.user.del);
  router.put('/users/:id', controller.user.update);
  router.patch('/users/:id/status', controller.user.updateStatus);
  router.patch('/users/:id/password', controller.user.updatePassword);
  router.patch('/users/:id/role', controller.user.updateRole);
  router.get('/users', controller.user.query);

  // 文件上传和下载
  router.post('/file', controller.file.upload);
  router.post('/file/upload/KeyBackupFile', controller.file.uploadKeyBackupFile);
  router.get('/file', controller.file.download);

  // 接口IP
  router.get('/interface/ip', controller.interface.ip);
  router.get('/interface/listif', controller.interface.listif);
  router.get('/interface/listmask', controller.interface.listmask);

  // 服务管理
  router.post('/servers', controller.server.create);
  router.get('/servers', controller.server.query);
  router.delete('/servers/:id', controller.server.del);

  // 密钥管理
  router.post('/keys', controller.key.create);
  router.get('/keys', controller.key.query);
  router.delete('/keys/:keyindex', controller.key.del);

  // 密钥备份
  router.post('/keybackup/mngcardLogin', controller.keybackup.mngcardLogin);
  router.post(
    '/keybackup/selectBackupType',
    controller.keybackup.selectBackupType
  );
  router.post('/keybackup/mngcardBackup', controller.keybackup.mngcardBackup);
  router.post('/keybackup/restoreInit', controller.keybackup.restoreInit);
  router.post('/keybackup/mngcardRestore', controller.keybackup.mngcardRestore);

  // 管理主机
  router.post('/adminips', controller.adminip.create);
  router.get('/adminips', controller.adminip.query);
  router.patch('/adminips/:id', controller.adminip.update);
  router.delete('/adminips/:id', controller.adminip.del);

  // 白名单
  router.post('/whitelists', controller.whitelist.create);
  router.get('/whitelists', controller.whitelist.query);
  router.patch('/whitelists/:id', controller.whitelist.update);
  router.delete('/whitelists/:id', controller.whitelist.del);

  // 接口ip
  router.post('/ifaddrs', controller.ifaddr.create);
  router.get('/ifaddrs', controller.ifaddr.query);
  router.delete('/ifaddrs/:ip', controller.ifaddr.del);

  // 管理卡
  router.post('/mngcard', controller.mngcard.create);
  router.patch('/mngcard/password', controller.mngcard.updatePassword);
  router.post('/mngcard/auth', controller.mngcard.auth);
  router.post('/mngcard/logout', controller.mngcard.logout);

  // 设备密钥初始化
  router.post('/initKey', controller.initKey.initKey);

  // 证书初始化
  router.post('/initCa', controller.initCa.initCa);

  // 首页
  router.get('/home/systemMonitor', jwt, controller.home.systemMonitor);
  router.get('/home/productInfo', controller.home.productInfo);
  router.get('/home/interfaceMonitor', controller.home.interfaceMonitor);
  router.get('/home/algTest', controller.home.algTest);

  // 日志
  router.get('/logs', controller.log.query);
};
