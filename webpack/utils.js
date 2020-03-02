/*
 * @Author: chen_huang
 * @Date: 2020-02-29 14:54:13
 * @LastEditors: chen_huang
 * @LastEditTime: 2020-02-29 14:54:14
 * @Description:
 */
const path = require("path");

exports.assetsPath = function(_path) {
  // const assetsSubDirectory = process.env.NODE_ENV === 'production'
  //   ? config.build.assetsSubDirectory
  //   : config.dev.assetsSubDirectory
  const assetsSubDirectory = "static";
  return path.posix.join(assetsSubDirectory, _path);
};
