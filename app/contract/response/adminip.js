'use strict';

const { paginationResponse } = require('./base');

module.exports = {
  queryAdminipResponse: {
    data: { type: 'array', itemType: 'adminip' },
    ...paginationResponse,
  },
};
