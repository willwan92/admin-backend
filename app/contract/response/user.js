'use strict';

module.exports = {
  queryUserResponse: {
    users: { type: 'array', itemType: 'user' },
  },
  userDetailResponse: {
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
};
