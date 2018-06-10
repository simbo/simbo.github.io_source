const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { loaders } = require('./loaders/index');


/**
 * Webpack Module Rules
 * https://webpack.js.org/configuration/module/
 */
const rules = [

  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [loaders.babel]
  },

  {
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [loaders.babel, loaders.typescript]
  },

  {
    test: /\.scss$/,
    exclude: /node_modules/,
    oneOf: [
      {
        resourceQuery: /^\?vue/,
        use: ['vue-style-loader', loaders.css, loaders.postcss, loaders.sass]
      },
      {
        use: [MiniCssExtractPlugin.loader, loaders.css, loaders.postcss, loaders.sass]
      }
    ]
  },

  {
    test: /\.pug$/,
    exclude: /node_modules/,
    oneOf: [
      {
        resourceQuery: /^\?vue/,
        use: [loaders.pug]
      },
      {
        use: ['raw-loader', loaders.pug]
      }
    ]
  },

  {
    test: /\.vue$/,
    exclude: /node_modules/,
    use: ['vue-loader']
  }

];


module.exports = {
  rules
};
