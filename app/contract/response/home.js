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
  algTestResponse: {
    card: { type: 'string', description: '加密卡状态' },
    SM1: { type: 'string', description: 'SM1算法正确性' },
    SM2: { type: 'string', description: 'SM2算法正确性' },
    SM3: { type: 'string', description: 'SM3算法正确性' },
    SM4: { type: 'string', description: 'SM4算法正确性' },
    random: { type: 'string', description: '随机数质量' },
  },
  interfaceMonitorResponse: {
    interfaces: { type: 'array', itemType: 'interfaceMonitor' },
  },
  initprogressResponse: {
    progress: { type: 'string', description: '当前进度' },
  },
  systimeResponse: {
    time: { type: 'string', description: '系统当前时间' },
  },
};
