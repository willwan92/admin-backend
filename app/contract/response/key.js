'use strict';

const { paginationResponse } = require('./base');

module.exports = {
  queryKeyResponse: {
    data: { type: 'array', itemType: 'key' },
    ...paginationResponse,
  },
};
