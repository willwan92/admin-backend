'use strict';

module.exports = {
  baseResponse: {
    code: { type: 'integer', required: true, example: 0 },
    result: { type: 'object' },
    message: { type: 'string', example: '成功' },
  },
};
