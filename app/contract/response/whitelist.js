'use strict';

const { paginationResponse } = require('./base');

module.exports = {
  queryWhitelistResponse: {
    data: { type: 'array', itemType: 'whitelist' },
    ...paginationResponse,
  },
};
