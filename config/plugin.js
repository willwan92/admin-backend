'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
//   mongoose: {
//     enable: true,
//     package: 'egg-mongoose'
//   }
// };

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.swaggerdoc = {
  enable: true,
  package: 'egg-swagger-doc-feat',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};
