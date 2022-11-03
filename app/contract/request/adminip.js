'use strict';

const { IPV4_REGEXP } = require('../regexp.js');

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
  createAdminipRequest: {
    ip: {
      type: 'string',
      required: true,
      format: IPV4_REGEXP,
      description: '管理主机ip',
      example: '10.101.10.12',
    },
    comment: {
      type: 'string',
      required: false,
      description: '备注',
      example: '',
    },
  },
  updateAdminipRequest: {
    comment: {
      type: 'string',
      required: false,
      description: '备注',
      example: '',
    },
  },
};
