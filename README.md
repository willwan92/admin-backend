# full-stack-demo-back



## 项目介绍

项目基于 eggjs 开发，eggjs 是基于nodejs的web开发框架。eggjs 文档参见：https://www.eggjs.org/zh-CN/tutorials，nodejs文档参见：https://www.nodeapp.cn/。

see [egg docs][egg] for more detail.

### 开发环境运行

```bash
$ npm i
$ npm run dev
```

### 生产环境部署

```bash
$ npm start 启动服务
$ npm stop 停止服务
```

### 项目目录结构

app目录：

- app/router.js 配置 URL 路由规则，具体参见 https://www.eggjs.org/zh-CN/basics/router
- app/controller/* 控制器，用于解析用户的输入，处理后返回相应的结果，具体参见 https://www.eggjs.org/zh-CN/basics/controller
- app/service/* 用于编写业务逻辑层，可选，建议使用，具体参见 https://www.eggjs.org/zh-CN/basics/service
- app/middleware/* 用于编写中间件，可选，具体参见 https://www.eggjs.org/zh-CN/basics/middleware
- app/models/* 用于定义数据库的模型，具体参见：https://github.com/eggjs/egg-sequelize 和 https://www.sequelize.cn/
- app/contract/* 用来定义请求参数和响应参数，用户参数校验和生成接口文档


config目录：

- config/config.default.js: 默认配置
- config/config.local.js: 开发环境运行配置
- config/config.prod.js：生产环境运行配置
- config/plugin.js: 用于配置需要加载的插件

### 项目中使用的主要插件

- egg-sequelize：用于连接数据库，文档参见 https://github.com/eggjs/egg-sequelize#readme
- egg-swagger-doc-feat 用于生成接口文档，文档参见 https://github.com/DG-Wangtao/egg-swagger-doc#readme
- egg-validate：用于校验参数，文档参见 https://github.com/eggjs/egg-validate#readme
- egg-jwt：用于生成token，文档参见 https://github.com/okoala/egg-jwt#readme