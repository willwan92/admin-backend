'use strict';

const { paginationResponse } = require('./base');

module.exports = {
  querySysupdateResponse: {
    data: { type: 'array', itemType: 'sysupdate' },
    ...paginationResponse,
  },
};
