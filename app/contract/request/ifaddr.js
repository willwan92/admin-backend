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
 * enum：参数为枚举类型时，规定可选的值
 */

module.exports = {
  ifaddrRequest: {
    ifname: {
        type: 'string',
        required: true,
        description: '接口名称',
        example: 'ge1',
      },
    ip: {
      type: 'string',
      required: true,
      format: IPV4_REGEXP,
      description: '接口ip',
      example: '10.10.10.10',
    },
    netmask: {
        type: 'string',
        required: true,
        description: '掩码',
        example: '255.255.255.0',
    },
    ping: {
        type: 'string',
        required: true,
        enum:['on','off'],
        description: '是否可ping',
        example: 'on',
    },
    admin: {
        type: 'string',
        required: true,
        enum:['on','off'],
        description: '是否可管理',
        example: 'off',
    },
  },
};
