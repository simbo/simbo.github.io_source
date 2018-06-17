const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { normalize } = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const { inProdMode, inDevMode, globals } = require('./environment');
const { paths } = require('./paths');


/**
 * Webpack Plugins List
 * https://webpack.js.org/concepts/plugins/
 */
const plugins = [];


/**
 * Define globals for all module scopes
 * (see `./environment.js`)
 * https://webpack.js.org/plugins/define-plugin/
 */
plugins.push(
  new webpack.DefinePlugin({
    ...Object.entries(globals).reduce((values, [key, value]) => ({
      ...values,
      [key]: JSON.stringify(value)
    }), {})
  })
);


/**
 * Shimmed libs
 * https://webpack.js.org/plugins/provide-plugin/
 * https://webpack.js.org/guides/shimming/
 */
plugins.push(
  new webpack.ProvidePlugin({
  })
);


/**
 * Vue Loader Plugin
 * https://vue-loader.vuejs.org/guide/#manual-configuration
 */
plugins.push(
  new VueLoaderPlugin()
);


/**
 * Create HTML Files
 * https://github.com/jantimon/html-webpack-plugin
 * https://github.com/jamesjieye/html-webpack-exclude-assets-plugin
 */
plugins.push(
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/content/home/index.pug',
    excludeAssets: [
    ]
  }),
  new ExcludeAssetsPlugin()
);


/**
 * Create global stylesheets
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 */
plugins.push(
  new MiniCssExtractPlugin({
    filename: `assets/css/[name]${inProdMode ? '.[contenthash]' : ''}.css`,
    chunkFilename: `assets/css/[id]${inProdMode ? '.[contenthash]' : ''}.css`
  })
);


/**
 * Copy static files
 * https://github.com/webpack-contrib/copy-webpack-plugin
 */
plugins.push(
  new CopyWebpackPlugin([{
    from: paths.src('public/**/*'),
    to: paths.dist(),
    context: paths.src('public')
  }])
);


/**
 * Remove dist folder for a clean build
 * https://github.com/johnagan/clean-webpack-plugin
 */
plugins.push(
  new CleanWebpackPlugin(['dist'], {
    root: paths.root()
  })
);


/**
 * Use unique short chunk ids, even for async chunks
 * (for long-term caching strategy in prod and for hmr in dev)
 */
plugins.push(
  new webpack.NamedChunksPlugin(chunk => {
    if (chunk.name) {
      return chunk.name;
    }
    return webpack.util.createHash('md4')
      .update(
        Array.from(chunk._modules.values())
          .map(m => normalize(m.context, m.request))
          .join('_')
      )
      .digest('base64')
      .replace(/[^a-z0-9]+/gi, '');
  })
);


/**
 * Use unique short module ids
 * (for long-term caching strategy in prod and for hmr in dev)
 */
plugins.push(
  inProdMode ? new webpack.HashedModuleIdsPlugin() : new webpack.NamedModulesPlugin()
);


/**
 * Enable HMR for development
 * https://webpack.js.org/concepts/hot-module-replacement/
 */
if (inDevMode) plugins.push(
  new webpack.HotModuleReplacementPlugin()
);


/**
 * Optimize chunk occurence order
 * https://github.com/webpack/docs/wiki/optimization
 * https://github.com/webpack/docs/wiki/internal-webpack-plugins#optimizeoccurenceorderpluginpreferentry
 */
if (inProdMode) plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(true)
);


/**
 * Bundle Analyzer
 * https://github.com/webpack-contrib/webpack-bundle-analyzer
 */
if (inProdMode) plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: paths.root('bundle-analyzer-report.html'),
    statsFilename: paths.root('bundle-analyzer-report.json'),
    generateStatsFile: false,
    logLevel: 'warn',
    openAnalyzer: false
  })
);


module.exports = {
  plugins
};
