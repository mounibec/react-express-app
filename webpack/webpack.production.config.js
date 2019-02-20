const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

const commonPlugins = common(process.env.NODE_ENV, __dirname);

module.exports = merge(commonPlugins, {
  mode: 'production'
});
