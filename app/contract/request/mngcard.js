'use strict';

module.exports = {
  createMngcardRequest: {
    name: {
      type: 'string',
      required: true,
      max: 32,
      description: '管理卡名称',
      example: '',
    },
    keyser: {
      type: 'string',
      required: true,
      max: 32,
      description: 'ukey序列号',
      example: 'K1426200303B3095',
    },
    password: {
      type: 'string',
      required: true,
      max: 32,
      description: 'ukey的PIN码',
      example: '',
    },
  },
  updateMngcardPwdRequest: {
    keyser: {
      type: 'string',
      required: true,
      max: 32,
      description: 'ukey序列号',
      example: 'K1426200303B3095',
    },
    oldPassword: {
      type: 'string',
      required: true,
      max: 32,
      description: '旧密码',
      example: '',
    },
    newPassword: {
      type: 'string',
      required: true,
      max: 32,
      description: '新密码',
      example: '',
    },
  },
  authMngcardPwdRequest: {
    keyser: {
      type: 'string',
      required: true,
      max: 32,
      description: 'ukey序列号',
      example: 'K1426200303B3095',
    },
    password: {
      type: 'string',
      required: true,
      max: 32,
      description: 'ukey的PIN码',
      example: '',
    },
  },
};
