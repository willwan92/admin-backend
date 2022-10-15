'use strict';

module.exports = {
  baseResponse: {
    code: { type: 'integer', required: true, example: 0, description: '0：成功；-1： 失败；422：参数错误' },
    result: { type: 'object' },
    message: { type: 'string', example: '成功' },
  },
  paginationResponse: {
    pageNo: { type: 'integer' },
    pageSize: { type: 'integer' },
    total: { type: 'integer' },
  },
};
