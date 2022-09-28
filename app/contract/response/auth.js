'use strict';

module.exports = {
  userLoginResponse: {
    userId: { type: 'integer', description: '用户id' },
    username: { type: 'string', description: '用户名' },
    token: { type: 'string', description: '登录token' },
  },
};
