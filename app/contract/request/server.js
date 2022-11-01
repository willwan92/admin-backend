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
  createServerRequest: {
    ip: {
      type: 'string',
      required: true,
      format: IPV4_REGEXP,
      description: '服务地址',
      example: '10.101.10.12',
    },
    port: {
      type: 'integer',
      required: true,
      min: 1,
      max: 65535,
      description: '服务端口，输入1-65535之间的整数',
      example: 554,
    },
    type: {
      type: 'integer',
      required: true,
      enum: [1, 2, 3],
      description:
        '服务类型，1代表SDF(国标)接口，2代表pcks11接口，3代表CSP接口',
      example: 1,
    },
  },
};
