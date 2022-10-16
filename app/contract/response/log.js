'use strict';

const { paginationResponse } = require('./base');

module.exports = {
  queryLogResponse: {
    data: { type: 'array', itemType: 'log' },
    ...paginationResponse,
  },
};
