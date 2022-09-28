'use strict';

module.exports = {
  baseResponse: {
    code: { type: 'integer', required: true, example: 0 },
    data: { type: 'object' },
    message: { type: 'string', example: '成功' },
  },
};
