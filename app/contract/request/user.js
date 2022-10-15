'use strict';

const { PWD_REGEXP, MOBILE_REGEXP } = require('../regexp.js');

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
      type: 'string',
      required: true,
      values: ['system', 'business', 'audit'],
      description:
        '用户角色。system: 系统管理员; business: 业务管理员; audit: 审计管理员。',
      example: 'system',
    },
    phone: {
      type: 'string',
      required: false,
      allowEmpty: true,
      format: MOBILE_REGEXP,
      description: '手机号',
    },
    email: {
      type: 'email',
      required: false,
      allowEmpty: true,
      description: '邮箱',
    },
    key: {
      type: 'string',
      required: false,
      description: 'key编码',
    },
    gender: {
      type: 'string',
      values: ['female', 'male', 'unknown'],
      description: '性别。female：女, male：男, unknown：未知',
      example: 'female',
    },
    status: {
      type: 'string',
      required: true,
      values: ['enable', 'disable'],
      description: '状态。enable：启用, disable：禁用',
      example: 'enable',
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
      description: '密码：8-16位，包含字母、数字和特殊字符的组合。',
      example: 'u_123456',
    },
  },
  updateUserRequest: {
    nickname: {
      type: 'string',
      required: true,
      max: 32,
      description: '用户昵称',
      example: '系统管理员',
    },
    role: {
      type: 'string',
      required: true,
      values: ['system', 'business', 'audit'],
      description:
        '用户角色。system: 系统管理员; business: 业务管理员; audit: 审计管理员。',
      example: 'system',
    },
    phone: {
      type: 'string',
      required: false,
      allowEmpty: true,
      format: MOBILE_REGEXP,
      description: '手机号',
    },
    email: {
      type: 'email',
      required: false,
      allowEmpty: true,
      description: '邮箱',
    },
    gender: {
      type: 'string',
      values: ['female', 'male', 'unknown'],
      description: '性别。female：女, male：男, unknown：未知',
      example: 'female',
    },
    status: {
      type: 'string',
      required: true,
      values: ['enable', 'disable'],
      description: '状态。enable：启用, disable：禁用',
      example: 'enable',
    },
    remarks: {
      type: 'string',
      max: 128,
      description: '备注',
    },
  },
  updateUserStatusRequest: {
    status: {
      type: 'string',
      required: true,
      values: ['enable', 'disable'],
      description: '状态。enable：启用, disable：禁用',
      example: 'enable',
    },
  },
  updateUserPasswordRequest: {
    password: {
      type: 'string',
      required: true,
      min: 8,
      max: 16,
      format: PWD_REGEXP,
      description: '密码：8-16位，包含字母、数字和特殊字符的组合。',
      example: 'u_123456',
    },
  },
  updateUserRoleRequest: {
    role: {
      type: 'string',
      required: true,
      values: ['system', 'business', 'audit'],
      description:
        '用户角色。system: 系统管理员; business: 业务管理员; audit: 审计管理员。',
      example: 'system',
    },
  },
};
