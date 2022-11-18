'use strict';

const { paginationResponse } = require('./base');

module.exports = {
  querySysrouteResponse: {
    data: { type: 'array', itemType: 'sysroute' },
    ...paginationResponse,
  },
};
