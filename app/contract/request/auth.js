'use strict';

module.exports = {
  userLoginRequest: {
    username: {
      type: 'string',
      required: true,
      description: '用户名',
      example: 'user1',
    },
    password: {
      type: 'string',
      required: true,
      description: '密码',
      example: 'u123456',
    },
    captcha: {
      type: 'string',
      required: true,
      description: '验证码,不区分大小写',
      example: '23fa',
    }
  },
  userLogoutRequest: {
    username: {
      type: 'string',
      required: true,
      description: '用户名',
      example: 'user1',
    },
  },
};
