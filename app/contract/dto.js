'use strict';

module.exports = {
  key: {
    keyindex: { type: 'integer', description: '密钥索引' },
    keytype: { type: 'string', description: '密钥类型' },
  },
  whitelist: {
    id: { type: 'integer', description: 'ID' },
    type: { type: 'integer', description: '类型' },
    ip: { type: 'string', description: 'IP' },
    port: { type: 'integer', description: '端口' },
    protocol: { type: 'string', description: '协议' },
    comment: { type: 'string', description: '备注' },
  },
  adminip: {
    id: { type: 'integer', description: 'ID' },
    ip: { type: 'string', description: '管理主机ip' },
    comment: { type: 'string', description: '备注' },
  },
  interface: {
    ip: { type: 'string', description: '接口IP' },
  },
  ifnamelist: {
    ifname: { type: 'string', description: '接口名称' },
  },
  masklist: {
    mask: { type: 'string', description: '掩码' },
  },
  fwips: {
    ifname: { type: 'string', description: '接口名称' },
    ip: { type: 'string', description: '接口IP' },
    netmask: { type: 'string', description: '掩码' },
    ping: { type: 'integer', description: '是否可ping' },
    admin: { type: 'integer', description: '是否可管理' },
  },
  server: {
    id: { type: 'integer', description: '服务编号' },
    ip: { type: 'string', description: '服务地址' },
    port: { type: 'string', description: '服务端口' },
    type: { type: 'string', description: '服务类型' },
  },
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
    id: { type: 'integer', description: 'id 唯一键' },
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
