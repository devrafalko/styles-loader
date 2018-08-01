const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude:/(node_modules)/,
        loader:'babel-loader',
        options:{
          presets:['env']
        }
      }
    ]
  }
};