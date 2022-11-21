'use strict';

const { MOBILE_REGEXP } = require('../regexp.js');

module.exports = {
  createMngcardRequest: {
    name: {
      type: 'string',
      required: true,
      max: 32,
      description: '管理卡名称',
      example: '',
    },
    type: {
      type: 'string',
      required: true,
      enum: ['admin', 'oper'],
      description: '管理卡类型，admin为管理卡，oper为操作卡',
      example: 'admin',
    },
    password: {
      type: 'string',
      required: true,
      max: 32,
      description: 'ukey的PIN码。例子为默认密码，可用于测试。',
      example: '12345678',
    },
    phone: {
      type: 'string',
      required: true,
      format: MOBILE_REGEXP,
      description: '持有人电话',
      example: '',
    },
  },
  updateMngcardPwdRequest: {
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
  loginMngcardRequest: {
    password: {
      type: 'string',
      required: true,
      max: 32,
      description: 'ukey的PIN码，默认是 12345678',
      example: '12345678',
    },
  },
  algTestRequest:{
    type: {
      type: 'string',
      required: true,
      enum: ['sm1', 'sm2','sm3','sm4','random','dev'],
      description: 'sm1算法测试，sm2算法测试，sm3算法测试，sm4算法测试，随机数质量测试，密码卡自检',
      example: 'sm2',
    },
  }
};
