'use strict';

module.exports = {
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
