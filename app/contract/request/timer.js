'use strict';

const { EMAIL_REGEXP } = require('../regexp');

module.exports = {
  timerRequest: {
    date: {
      type: 'string',
      required: true,
      max: 10,
      description: '日期',
      example: '2022/12/12',
    },
    time: {
      type: 'string',
      required: true,
      max: 8,
      description: '时间',
      example: '12:12:30',
    },
  },
};
