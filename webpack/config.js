const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const { inProdMode, mode } = require('./environment');
const { paths } = require('./paths');
const { plugins } = require('./plugins');
const { rules } = require('./rules');


/**
 * Webpack Config
 * https://webpack.js.org/configuration/#options
 */
const config = {


  /**
   * Entries
   * https://webpack.js.org/concepts/entry-points/
   * https://webpack.js.org/configuration/entry-context/
   */
  context: paths.root(),
  entry: {
    home: paths.src('scripts/home.ts'),
  },


  /**
   * Output
   * https://webpack.js.org/concepts/output/
   * https://webpack.js.org/configuration/output/
   */
  output: {
    path: paths.dist(),
    filename: `assets/js/[name]${inProdMode ? '.[contenthash]' : ''}.js`,
    sourceMapFilename: `assets/js/[name]${inProdMode ? '.[contenthash]' : ''}.js.map`
  },


  /**
   * Module Resolution
   * https://webpack.js.org/concepts/module-resolution/
   * https://webpack.js.org/configuration/resolve/
   */
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    modules: [
      paths.root('node_modules')
    ],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },


  /**
   * Sourcemap Settings
   * https://webpack.js.org/configuration/devtool/
   */
  devtool: inProdMode ? 'source-map' : 'inline-cheap-module-source-map',


  /**
   * Dev Server
   * https://webpack.js.org/configuration/dev-server/
   */
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    open: false,
    hot: true
  },


  /**
   * Optimization and Chunk Splitting
   * https://webpack.js.org/configuration/optimization/
   */
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },

    /**
     * Uglify
     * https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
     */
    minimize: inProdMode,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
        }
      })
    ]

  },


  /**
   * Stats Output
   * https://webpack.js.org/configuration/stats/
   */
  stats: {
    entrypoints: true,
    children: true,
    chunksSort: 'name',
    env: true,
    version: true,
    modules: true
  },


  /**
   * Build Mode
   * (see `./environment.js`)
   * https://webpack.js.org/concepts/mode/
   */
  // TODO: set mode to 'none' and customize the optimizations (some are already, see plugins)
  mode,


  /**
   * Plugins
   * (see `./plugins.js`)
   * https://webpack.js.org/concepts/plugins/
   */
  plugins,


  /**
   * Module Rules
   * (see `./rules.js`)
   * https://webpack.js.org/configuration/module/
   */
  module: { rules }


};


module.exports = {
  config
};
