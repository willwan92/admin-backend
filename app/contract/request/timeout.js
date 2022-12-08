'use strict';

module.exports = {
  updateTimeoutRequest: {
    timeout: {
      type: 'integer',
      required: true,
      min: 1,
      max: 20,
      description: 'web超时时间。单位：分钟',
      example: 10,
    },
  },
};
