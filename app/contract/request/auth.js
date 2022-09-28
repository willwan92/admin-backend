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
  },
};
