'use strict';

const { MOBILE_REGEXP } = require('../regexp.js');

module.exports = {
  logExportRequest:{
    type: {
      type: 'integer',
      required: true,
       min:0,
       max:200,
      description: '0所有日志，1规则日志，2设备管理，3设备状态，13HA日志，200其他',
      example: 0,
    },
  }
};
