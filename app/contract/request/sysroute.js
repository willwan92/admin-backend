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
  createSysrouteRequest: {
    ip: {
      type: 'string',
      required: true,
      format: IPV4_REGEXP,
      description: '接口ip',
      example: '2.2.2.0',
    },
    mask: {
        type: 'string',
        required: true,
        description: '掩码',
        example: '255.255.255.0',
    },
    gwip: {
        type: 'string',
        required: true,
        format: IPV4_REGEXP,
        description: '网关ip',
        example: '100.100.100.1',
      },
    metric: {
        type: 'integer',
        required: true,
        min: 0,
        max: 100,
        description: '权重，输入0-100之间的整数',
        example: 0,
      },
  },
};
