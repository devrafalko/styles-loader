const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

const StylesLoader = require('styles-loader');
const stylesLoader = new StylesLoader({
  extract: 'bundled.css',
  file: {
    name: '[hash].[ext]'
  }
});

module.exports = merge(common, stylesLoader, {
  mode: 'production',
  watch: false,
  stats: false,
  optimization: {
    minimizer: [new TerserPlugin()]
  }
});