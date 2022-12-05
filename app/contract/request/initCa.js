'use strict';

const { EMAIL_REGEXP } = require('../regexp');

module.exports = {
  initCaRequest: {
    name: {
      type: 'string',
      required: true,
      max: 32,
      description: '证书名称',
      example: '',
    },
    commonname: {
      type: 'string',
      required: true,
      max: 32,
      description: '证书主题',
      example: '',
    },
    state: {
      type: 'string',
      required: false,
      max: 32,
      description: '省',
      example: '',
    },
    city: {
      type: 'string',
      required: false,
      max: 32,
      description: '市区',
      example: '',
    },
    organization: {
      type: 'string',
      required: false,
      max: 32,
      description: '组织',
      example: '',
    },
    depart: {
      type: 'string',
      required: false,
      max: 32,
      description: '二级组织',
      example: '',
    },
    email: {
      type: 'string',
      required: false,
      format: EMAIL_REGEXP,
      description: '邮件',
      example: '',
    },
    lifetime: {
      type: 'string',
      required: true,
      max: 32,
      description: '证书有效期，单位：天',
      example: '30',
    },
    password: {
      type: 'string',
      required: true,
      max: 32,
      description: 'CA私钥口令',
      example: '',
    },
  },
  importCaRequest: {
    certfile: {
      type: 'string',
      required: true,
      max: 32,
      description: 'ca证书名称',
      example: 'cacert.pem',
    },
    keyfile: {
      type: 'string',
      required: true,
      max: 32,
      description: '证书私钥',
      example: 'key.pem',
    },
    password: {
      type: 'string',
      required: true,
      max: 32,
      description: 'CA私钥口令',
      example: 'admin@123',
    },
  },
};
