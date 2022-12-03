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
  clockRequest: {
    server: {
      type: 'string',
      required: true,
      max: 128,
      description: '时钟服务器地址或域名',
      example: '1.1.1.1',
    },
    period: {
      type: 'integer',
      required: true,
      min: 10,
      max: 3600,
      description: '同步周期（秒）',
      example: 60,
    },
    start: {
        type: 'integer',
        required: true,
        enum: [ 0,1 ],
        description: '状态，1启动，0未启动',
        example: 1,
      },
  },
};
