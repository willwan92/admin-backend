'use strict';

module.exports = {
  systemMonitorResponse: {
    cpu: { type: 'number', description: 'cpu 使用率百分比' },
    mem: { type: 'number', description: '内存使用率百分比' },
    hardisk: { type: 'number', description: '硬盘使用率百分比' },
    file: { type: 'number', description: '文件系统使用率百分比' },
  },
  productInfoResponse: {
    company_name: { type: 'string', description: '公司名称' },
    product_name: { type: 'string', description: '产品名称' },
    product_type: { type: 'string', description: '产品型号' },
    product_version: { type: 'string', description: '产品版本' },
    product_sn: { type: 'string', description: '产品序列号' },
    system_time: { type: 'string', description: '系统运行时间' },
  },
  interfaceMonitorResponse: {
    interfaces: { type: 'array', itemType: 'interfaceMonitor' },
  },
};