const props = require('typeof-properties');
const args = require('typeof-arguments');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sass = require('sass');

module.exports = class CssStyles {
  constructor(o = {}) {
    const extractDefined = typeof o.extract === 'string';
    const options = 'object|instance|undefined';
    const types = { url: options, file: options, css: options, style: options, less: options, sass: options, image: options };

    args(arguments, [options], ({ message }) => {
      throw new Error(`webpack-css-loaders: ${message}`);
    });

    props(o, types, ({ message }) => {
      throw new Error(`webpack-css-loaders: ${message}`);
    });

    this.data = o;

    const config = {
      module: {
        rules: [
          this.url(),
          this.file(),
          ...this.css(extractDefined)
        ]
      }
    };

    return (() => ({
      module: {
        rules: [
          this.url(),
          this.file(),
          ...this.css(extractDefined)
        ]
      },
      plugins: extractDefined ? [
        new MiniCssExtractPlugin({
          filename: extractDefined ? o.extract : 'styles.css'
        }),
      ] : []
    }))();
  }

  get imageWebpackDefaults() { return {}; }
  get cssDefaults() { return {}; }
  get lessDefaults() { return {}; }
  get styleDefaults() { return {}; }

  get sassDefaults() {
    return {
      implementation: sass
    };
  }

  get urlDefaults() {
    return {
      limit: 8192,
      name: '[name].[ext]',
      outputPath: './assets/misc'
    };
  }

  get fileDefaults() {
    return {
      name: '[name].[ext]',
      outputPath: './assets/images'
    };
  }

  get cssLoader() {
    return {
      loader: "css-loader",
      options: Object.assign(this.cssDefaults, this.data.css || {})
    }
  }

  get styleLoader() {
    return {
      loader: "style-loader",
      options: Object.assign(this.styleDefaults, this.data.style || {})
    }
  }

  get sassLoader() {
    return {
      loader: "sass-loader",
      options: Object.assign(this.sassDefaults, this.data.sass || {})
    }
  }

  get lessLoader() {
    return {
      loader: "less-loader",
      options: Object.assign(this.lessDefaults, this.data.less || {})
    }
  }

  get fileLoader() {
    return {
      loader: 'file-loader',
      options: Object.assign(this.fileDefaults, this.data.file || {})
    }
  }

  get imageWebpackLoader() {
    return {
      loader: 'image-webpack-loader',
      options: Object.assign(this.imageWebpackDefaults, this.data.image || {})
    }
  }

  get urlLoader() {
    return {
      loader: "url-loader",
      options: Object.assign(this.urlDefaults, this.data.url || {})
    };
  }

  file() {
    return {
      test: /\.(jpe?g|png|gif)$/i,
      use: [this.fileLoader, this.imageWebpackLoader]
    }
  }

  url() {
    return {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [this.urlLoader]
    };
  }

  css(extractDefined) {
    return [
      {
        test: /\.css$/,
        use: !extractDefined ?
          [this.styleLoader, this.cssLoader] :
          [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: ''
              },
            },
            this.cssLoader
          ]
      },
      {
        test: /\.scss$/,
        use: !extractDefined ?
          [this.styleLoader, this.cssLoader, this.sassLoader] :
          [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: ''
              },
            },
            this.cssLoader,
            this.sassLoader
          ]
      },
      {
        test: /\.less$/,
        use: !extractDefined ?
          [this.styleLoader, this.cssLoader, this.lessLoader] :
          [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: ''
              },
            },
            this.cssLoader,
            this.lessLoader
          ]
      }
    ];
  }
};