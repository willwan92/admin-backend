'use strict';

module.exports = {
  caCertResponse: {
    name: { type: 'string', description: '名称' },
    version: { type: 'string', description: '版本' },
    serial: { type: 'string', description: '序列号' },
    issuer: { type: 'string', description: '颁发者' },
    subject: { type: 'string', description: '主题' },
    pubkey_alg: { type: 'string', description: '公钥算法' },
    modulus: { type: 'string', description: '公钥' },
    sign_alg: { type: 'string', description: '签名算法' },
    startdate: { type: 'string', description: '起始时间' },
    enddate: { type: 'string', description: '终止时间' },
  },
  sm2CertResponse: {
    name: { type: 'string', description: '名称' },
    type: { type: 'integer', description: '类型，2表示sm2证书'},
    issuer: { type: 'string', description: '颁发者' },
    subject: { type: 'string', description: '主题' },
    cn: { type: 'string', description: '国家' },
    startdate: { type: 'string', description: '起始时间' },
    enddate: { type: 'string', description: '终止时间' },
    serial: { type: 'string', description: '序列号' },
    method: { type: 'integer', description:'3表示证书不可用，其他可用'},
  },
  crlResponse: {
    name: { type: 'string', description: '名称' },
    version: { type: 'string', description: '版本' },
    issuer: { type: 'string', description: '颁发者' },
    lastupdate: { type: 'string', description: '更新日期' },
    nextupdate: { type: 'string', description: '下次更新日期' },
    signature: { type: 'string', description: '签名算法' },
    revoked_num: { type: 'integer', description:'吊销个数'},
  },
};
