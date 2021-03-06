# Description
This is a `webpack` boilerplate that covers all `plugins` and `loaders` that are necessary to load `.css`, `.less` and | or `.sass` files into your project. Use `npm install styles-loader` rather than installing all css, sass and less loaders and plugins separately.

# Install
`npm install styles-loader --save-dev`

##### your `webpack.config.js `
* in order to simplify the configuration process, it uses `webpack-merge` module to combine plenty webpack configs into one [\[read more\]](https://webpack.js.org/guides/production/)
* all you have to do is to require `styles-loader`, create the new instance of it and inject it with `merge` module
```javascript
const { merge } = require('webpack-merge');
const StylesLoader = require('styles-loader'); //this is a [Function] constructor
const stylesLoader = new StylesLoader(); //create new instace with all ready-to-use webpack rules, plugins, etc.

module.exports = merge(stylesLoader, {
  //your webpack settings here
  entry:'./index.js',
  output:{
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/'
  }
});
```

##### your entry `index.js` file
```javascript
  import './css/styles.css';
  import './scss/bootstrap.scss';
  import './less/grid.less';
```

* By default, all images, icons and fonts loaded in all `.css`, `.sass` and `.less` files with `url()` and `@import` keywords will be stored in the `./dist/assets/images` and `./dist/assets/misc` directories.
* By default, all imported and required `.css`, `.sass` and `.less` files will be parsed to *css* and added to the DOM by injecting a `<style>` tag
* and...  that’s it!

# Customization *(optional)*
The `new StylesLoader([object])` takes the *(optional)* [Object] `config` object, that lets to customize how the webpack loaders behave under the hood.

```javascript
const StylesLoader = require('styles-loader');
const stylesLoader = new StylesLoader({ //[Object] argument
  extract: 'styles.css', //it creates the bundled styles.css file rather than add <style> tags in the html file
  url:{/* the url-loader and file-loader options here for .woff, .ttf, .eot, .svg files */},
  file:{/* the file-loader options here for .jpg, .png, .gif files */},
  css:{/* the css-loader options here */},
  styles:{/*the style-loader options here */}
  sass:{/* the sass-loader options here */},
  less:{/*the less-loader options here */}
});
```

#### 1. Add styles either as `<style>` or `<link>` in your html file
* By default, all imported and required `.css`, `.sass` and `.less` files will be parsed to `.css` and added to the DOM by injecting a `<style>` tag automatically
* In order to create one bundled `.css` file from all imported `.css`, `.sass` and `.less` files, add `extract` property to the [Object] `config`. It should indicate the [String] path to the new bundled css file, eg: `"dist/styles.css"`
* **Remember** to add `<link rel="stylesheet" href="dist/styles.css"/>` into your `.html` file
```javascript
const { merge } = require('webpack-merge');
const StylesLoader = require('styles-loader');
const stylesLoader = new StylesLoader({
  extract: 'styles.css'
});

module.exports = merge(stylesLoader, {
  //your webpack settings here
  entry:'./index.js',
  output:{
    path: path.join(__dirname, 'dist')
  }
});
```

#### 2. Customize all loaders and plugins
##### `config`.`css`
**Default:** `{}`
* It allows to use all `css-loader` [options](https://github.com/webpack-contrib/css-loader#options)
* The `css-loader` is used to resolve all `@import`s and `url()`s
```javascript
const stylesLoader = new StylesLoader({
  css: {
    url: false
  }
});
```
##### `config`.`style`
**Default:** `{}`
* It allows to use all `style-loader` [options](https://github.com/webpack-contrib/style-loader#options)
* The `style-loader` is used to add the `<style>` tags into the html file with all stylesheets
* it works only if the `'extract'` `config` property is not defined *(because then the bundled `.css` file is created)*

```javascript
const stylesLoader = new StylesLoader({
  style: {
    insert: 'head'
  }
});
```
##### `config`.`sass`
**Default:** `{}`
* It allows to use all `sass-loader` [options](https://github.com/sass/node-sass#options)
* The `sass-loader` is used to compile the `scss` into `css`
```javascript
const stylesLoader = new StylesLoader({
  sass: {
    outputStyle: 'compressed'
  }
});
```

##### `config`.`less`
**Default:** `{}`
* It allows to use all `less-loader` [options](http://lesscss.org/usage/#less-options)
* The `less-loader` is used to compile the `less` into `css`
```javascript
const stylesLoader = new StylesLoader({
  less: {
    math:'[parens-division]'
  }
});
```
##### `config`.`url`
**Default:** `{ limit: 8192, name: '[name].[ext]', outputPath: './assets/misc' }`
* It allows to use all `url-loader` [options](https://github.com/webpack-contrib/url-loader#options)
* The `url-loader` is used to transform small files *(`woff`, `ttf`, `eot`, `svg`)* into `base64 URIs`

```javascript
const stylesLoader = new StylesLoader({
  url: {
    limit: 20000 //only the files bigger than 20000 bytes will be stored in assets folder
  }
});
```
##### `config`.`file`
**Default:** `{ name: '[name].[ext]', outputPath: './assets/images' }`
* It allows to use all `file-loader` [options](https://github.com/webpack-contrib/file-loader#options)
* The `file-loader` is used to emit all `url()` and `@import` required `jpg`, `png`, `gif` files into the output directory

```javascript
const stylesLoader = new StylesLoader({
  file: {
    name: '[hash].[ext]',
    outputPath:'assets/'
  }
});
```

##### `config`.`image`
**Default:** `{}`
* It allows to use all `image-webpack-loader` [options](https://github.com/tcoopman/image-webpack-loader#options)
* The `image-webpack-loader` is used to optimize `jpg`, `png`, `gif` files
```javascript
const stylesLoader = new StylesLoader({
  image: {
    mozjpeg: {
      progressive: true,
      quality: 65
    }
  }
});
```

# Sample
`git clone https://github.com/devrafalko/styles-loader.git`  
`cd styles-loader/sample`  
`npm install`  
`npm start` or `npm run build`  
Check out how the webpack config files look like and how all assets files are handled.