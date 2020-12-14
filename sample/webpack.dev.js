const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const StylesLoader = require('styles-loader');
const stylesLoader = new StylesLoader({
  extract: 'bundled.css',
});

module.exports = merge(common, stylesLoader, {
  mode: 'development',
  watch: true,
  stats: {
    version: false,
    colors: true,
    warnings: false,
    assets: true,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    depth: false,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    hash: false,
    modules: false,
    providedExports: false,
    publicPath: false,
    timings: true,
    usedExports: false
  }
});