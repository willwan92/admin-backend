'use strict';

module.exports = {
  log: {
    date: {
      type: 'string',
      description: '时间',
      example: '2022-10-15 6:47:21',
    },
    user: { type: 'string', description: '用户（管理员）名称' },
    sip: { type: 'string', description: '源（客户端）IP地址' },
    pri: { type: 'number', description: '日志级别' },
    type: { type: 'number', description: '日志类型' },
    msg: { type: 'string', description: '日志信息' },
  },
  user: {
    id: { type: 'string', description: 'id 唯一键' },
    username: { type: 'string', description: '用户名' },
    nickname: { type: 'string', description: '用户昵称' },
    role: { type: 'string', description: '用户角色' },
    phone: { type: 'string', description: '手机号' },
    email: { type: 'string', description: '邮箱' },
    key: { type: 'string', description: 'key编码' },
    gender: { type: 'string', description: '性别' },
    status: { type: 'string', description: '状态' },
    remarks: { type: 'string', description: '备注' },
    created_at: {
      type: 'string',
      description: '创建时间',
      example: '2022-10-15T06:47:21.127Z',
    },
  },
  interfaceMonitor: {
    if_name: { type: 'string', description: '接口名称' },
    link_status: {
      type: 'string',
      description: '接口状态',
      example: '1（连接），0（未连接）',
    },
    in_flow: { type: 'string', description: '接收速率' },
    out_flow: { type: 'string', description: '发送速率' },
  },
};
