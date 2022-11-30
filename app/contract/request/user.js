'use strict';

const { PWD_REGEXP, MOBILE_REGEXP, EMAIL_REGEXP } = require('../regexp.js');

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
      required: false,
      max: 32,
      description: '用户昵称',
      example: '系统管理员',
    },
    role: {
      type: 'string',
      required: true,
      enum: ['system', 'business', 'audit'],
      description:
        '用户角色。system: 系统管理员; business: 业务管理员; audit: 审计管理员。',
      example: 'system',
    },
    phone: {
      type: 'string',
      required: false,
      format: MOBILE_REGEXP,
      description: '手机号',
      example: '18812342134',
    },
    email: {
      type: 'string',
      required: false,
      format: EMAIL_REGEXP,
      max: 64,
      description: '邮箱',
      example: '18812342134@163.com',
    },
    gender: {
      type: 'string',
      required: false,
      enum: ['female', 'male', 'unknown'],
      description: '性别。female：女, male：男, unknown：未知',
      example: 'female',
    },
    status: {
      type: 'string',
      required: true,
      enum: ['enable', 'disable'],
      description: '状态。enable：启用, disable：禁用',
      example: 'enable',
    },
    remarks: {
      type: 'string',
      required: false,
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
      enum: ['system', 'business', 'audit'],
      description:
        '用户角色。system: 系统管理员; business: 业务管理员; audit: 审计管理员。',
      example: 'system',
    },
    phone: {
      type: 'string',
      required: false,
      format: MOBILE_REGEXP,
      description: '手机号',
      example: '18812342134',
    },
    email: {
      type: 'string',
      required: false,
      format: EMAIL_REGEXP,
      max: 64,
      description: '邮箱',
      example: '18812342134@163.com',
    },
    gender: {
      type: 'string',
      required: false,
      enum: ['female', 'male', 'unknown'],
      description: '性别。female：女, male：男, unknown：未知',
      example: 'female',
    },
    status: {
      type: 'string',
      required: true,
      enum: ['enable', 'disable'],
      description: '状态。enable：启用, disable：禁用',
      example: 'enable',
    },
    remarks: {
      type: 'string',
      required: false,
      max: 128,
      description: '备注',
    },
  },
  updateUserStatusRequest: {
    status: {
      type: 'string',
      required: true,
      enum: ['enable', 'disable'],
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
    oldpassword: {
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
      enum: ['system', 'business', 'audit'],
      description:
        '用户角色。system: 系统管理员; business: 业务管理员; audit: 审计管理员。',
      example: 'system',
    },
  },
};
