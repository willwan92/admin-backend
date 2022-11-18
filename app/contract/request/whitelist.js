'use strict';

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
  whitelistRequest: {
    type: {
      type: 'integer',
      required: true,
      enum: [1, 2, 3],
      description: '类型，1代表单个ip，2代表ip范围，3代表ip/mask',
      example: 1,
    },
    ip: {
      type: 'string',
      required: true,
      description:
        '单个IP（1.1.1.1）或者IP范围（1.1.1.1-1.1.1.100）或者IP/MASK（1.1.1.0/255.255.255.0）',
      example: '1.1.1.1',
    },
    port: {
      type: 'integer',
      required: true,
      min: 1,
      max: 65535,
      description: '端口',
      example: 1,
    },
    protocol: {
      type: 'string',
      required: true,
      max: 32,
      description: '协议类型，选项：tcp/udp/icmp/any',
      example: 'tcp',
    },
    comment: {
      type: 'string',
      required: false,
      max: 85,
      description: '备注',
      example: '',
    },
  },
};
