const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common.config.js');

const commonPlugins = common(process.env.NODE_ENV, path.resolve(__dirname, '..'));

module.exports = merge(commonPlugins, {
  devtool: 'source-map',
  performance: {
    hints: 'warning'
  },
  mode: 'development'
});
