'use strict';

module.exports = {
  paginationRequest: {
    page: {
      type: 'int',
      required: true,
      description: '页码',
      example: '0、1、2， 页码从0开始',
    },
    pageSize: {
      type: 'int',
      required: true,
      description: '每页条数',
      example: '10',
    },
  },
};
