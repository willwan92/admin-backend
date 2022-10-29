'use strict';

const { paginationResponse } = require('./base');

module.exports = {
  queryServerResponse: {
    data: { type: 'array', itemType: 'server' },
    ...paginationResponse,
  },
};
