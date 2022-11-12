'use strict';

/**
 * 参数验证规则书写说明：
 * type：类型，必需
 * required：是否必填，必需（值为false是也要写，否则参数校验无法通过）
 * min：最小长度
 * max：最大长度
 * description：参数描述
 * example：参数示例
 * values：参数为枚举类型时，规定可选的值
 */

module.exports = {
  mngcardLoginRequest: {
    cardNum: {
      type: 'integer',
      required: true,
      min: 1,
      description: '管理卡号。不需要用户输入，如管理卡1登录传1',
      example: 1,
    },
    password: {
      type: 'string',
      required: true,
      max: 32,
      description: 'ukey的PIN码，默认是 12345678',
      example: '12345678',
    },
  },
  mngcardBackupRequest: {
    cardNum: {
      type: 'integer',
      required: true,
      min: 1,
      description: '管理卡号。不需要用户输入，如管理卡1备份传1',
      example: 1,
    },
    password: {
      type: 'string',
      required: true,
      max: 32,
      description: 'ukey的PIN码，默认是 12345678',
      example: '12345678',
    },
  },
  mngcardRestoreRequest: {
    cardNum: {
      type: 'integer',
      required: true,
      min: 1,
      description: '管理卡号。不需要用户输入，如管理卡1恢复传1',
      example: 1,
    },
    password: {
      type: 'string',
      required: true,
      max: 32,
      description: 'ukey的PIN码，默认是 12345678',
      example: '12345678',
    },
  },
  selectbackupTypeRequest: {
    type: {
      type: 'string',
      required: true,
      enum: ['ecc', 'all'],
      description: '备份的密钥类型。ecc为备份非对称密钥；all为备份对称和非对称密钥',
      example: 'ecc',
    },
    password: {
      type: 'string',
      required: true,
      max: 32,
      description: 'ukey的PIN码。该参数界面暂时不需要输入，调用接口时前端先写死12345678',
      example: '12345678',
    },
  },
  restoreInitRequest: {
    password: {
      type: 'string',
      required: true,
      max: 32,
      description: 'ukey的PIN码。该参数界面暂时不需要输入，调用接口时前端先写死12345678',
      example: '12345678',
    },
  },
};
