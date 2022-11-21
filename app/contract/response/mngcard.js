'use strict';

const { paginationResponse } = require('./base');

module.exports = {
  queryMngcardResponse: {
    data: { type: 'array', itemType: 'mngcardinit' },
    ...paginationResponse,
  },
};
