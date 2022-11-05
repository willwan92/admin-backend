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
  createKeyRequest: {
    keytype: {
      type: 'string',
      required: true,
      enum: ['sm1', 'sm2', 'sm4'],
      description: '密钥类型',
      example: 'sm1',
    },
    keyindex: {
      type: 'integer',
      required: true,
      min: 0,
      max: 1023,
      description: '密钥索引',
      example: 1,
    },
    keylen: {
      type: 'integer',
      required: false,
      min: 1,
      max: 32,
      description: '密钥长度，生成sm1或者sm4密钥是必传',
      example: 1,
    },
  },
  delKeyRequest: {
    keytype: {
      type: 'string',
      required: true,
      enum: ['sm1', 'sm2'],
      description: '密钥类型：sm2（sm2密钥），sm1（对称密钥）',
      example: 'sm1',
    },
  },
};
