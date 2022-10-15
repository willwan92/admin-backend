'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app });

  router.post('/auth/login', controller.auth.login);
  router.get('/auth/captcha', controller.auth.captcha);
  router.post('/users', controller.user.create);
  router.get('/users/:id', jwt, controller.user.get);
  router.delete('/users/:id', controller.user.del);
  router.put('/users/:id', controller.user.update);
  router.patch('/users/:id/status', controller.user.updateStatus);
  router.patch('/users/:id/password', controller.user.updatePassword);
  router.patch('/users/:id/role', controller.user.updateRole);
  router.get('/users', controller.user.query);
  router.get('/home/systemMonitor', jwt, controller.home.systemMonitor);
  router.get('/home/productInfo', controller.home.productInfo);
  router.get('/home/interfaceMonitor', controller.home.interfaceMonitor);
  router.get('/home/algTest', controller.home.algTest);
};
