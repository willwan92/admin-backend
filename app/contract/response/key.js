'use strict';

const { paginationResponse } = require('./base');

module.exports = {
  queryAdminipResponse: {
    data: { type: 'array', itemType: 'key' },
    ...paginationResponse,
  },
};
