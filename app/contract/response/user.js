'use strict';

module.exports = {
  queryUserResponse: {
    users: { type: 'array', itemType: 'user' },
    //   pageNo: { type: 'integer' },
    //   pageSize: { type: 'integer' },
    //   totalCount: { type: 'integer' },
    //   hasNextPage: { type: 'boolean' },
  },
  userDetailResponse: {
    id: { type: 'string', description: 'id 唯一键' },
    username: { type: 'string', description: '用户名' },
    nickname: { type: 'string', description: '用户昵称' },
  },
};
