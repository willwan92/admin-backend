'use strict';

module.exports = {
  queryInterfaceIpResponse: {
    data: { type: 'array', itemType: 'interface' },
  },
  queryInterfaceListIfResponse: {
    data: { type: 'array', itemType: 'ifnamelist' },
  },
  queryInterfaceListMaskResponse: {
    data: { type: 'array', itemType: 'masklist' },
  },
  clockResponse: {
    server: { type: 'string', description: '时钟服务器' },
    period: { type: 'integer', description: '同步周期（秒）' },
    start: { type: 'integer', description: '状态，1启动，0未启动' },
  },
};
