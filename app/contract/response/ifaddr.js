'use strict';

const { paginationResponse } = require('./base');

module.exports = {
  ifaddrResponse: {
    data: { type: 'array', itemType: 'fwips' },
    ...paginationResponse,
  },
};
