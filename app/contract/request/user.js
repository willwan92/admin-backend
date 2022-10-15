'use strict';

const { PWD_REGEXP, MOBILE_REGEXP } = require('../regexp.js')

module.exports = {
  createUserRequest: {
    username: {
      type: 'string', 
      required: true,
      max: 32,
      description: '用户名',
      example: 'user1',
    },
    nickname: {
      type: 'string',
      required: true,
      max: 32,
      description: '用户昵称',
      example: '系统管理员',
    },
    role: {
      type: 'enum',
      values: ['system', 'business', 'audit'],
      description: '用户角色',
      example: 'system: 系统管理员; business: 业务管理员; audit: 审计管理员。',
    },
    phone: {
      type: 'string',
      required: false,
      format: MOBILE_REGEXP,
      description: '手机号',
    },
    email: {
      type: 'email',
      allowEmpty: true,
      description: '邮箱',
    },
    key: {
      type: 'string',
      required: false,
      description: 'key编码',
    },
    gender: {
      type: 'enum',
      values: ['female', 'male', 'unknown'],
      description: '性别',
    },
    status: {
      type: 'enum',
      values: ['enable', 'disable'],
      description: '状态',
    },
    remarks: {
      type: 'string',
      max: 128,
      description: '备注',
    },
    password: {
      type: 'string',
      required: true,
      min: 8,
      max: 16,
      format: PWD_REGEXP,
      description: '密码',
      example: '例如：u_123456; 密码复杂度：8-16位，包含字母、数字和特殊字符的组合。',
    },
  },
  queryUsersRequest: {
    username: {
      type: 'string', 
      description: '用户名称',
    },
    phone: {
      type: 'string',
      description: '手机号',
    },
    status: {
      type: 'enum',
      values: ['enable', 'disable'],
      description: '状态',
    },
    startDate: {
      type: 'date',
      description: '创建日期范围',
      example: 'YYYY-MM-DD',
    },
    endDate: {
      type: 'date',
      description: '创建日期范围',
      example: 'YYYY-MM-DD',
    },
  }
};
