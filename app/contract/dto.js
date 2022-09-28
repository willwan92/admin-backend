'use strict';

module.exports = {
  user: {
    id: { type: 'string', description: 'id 唯一键' },
    username: { type: 'string', description: '用户名' },
    nickname: { type: 'string', description: '用户昵称' },
  },
  interfaceMonitor: {
    if_name: { type: 'string', description: '接口名称' },
    link_status: { type: 'string', description: '接口状态', example: '1（连接），0（未连接）' },
    in_flow: { type: 'string', description: '接收速率' },
    out_flow: { type: 'string', description: '发送速率' },
  },
};
