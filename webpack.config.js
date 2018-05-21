const autoprefixer = require('autoprefixer');
const chalk = require('chalk');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cssMqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const sortMediaqueries = require('css-mqpacker-sort-mediaqueries');
const stylus = require('stylus');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

const isProductionMode = process.env.NODE_ENV === 'production';
const mode = isProductionMode ? 'production' : 'development';

const browsers = ['last 2 versions', '> 0.2%'];

const globals = {
  'process.env.NODE_ENV': mode
};

const rootPath = (...trailers) => path.join(__dirname, ...trailers);

const typescriptLoader = {
  loader: 'ts-loader',
  options: {
    appendTsSuffixTo: [/\.vue$/]
  }
};

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { browsers }
        }
      ]
    ],
    plugins: ['@babel/transform-runtime']
  }
};

const stylusLoader = {
  loader: 'stylus-loader',
  options: {
    define: { ...globals },
    paths: [rootPath('src', 'styles', 'imports')],
    'include css': true,
    'inline-url': stylus.url({
      path: rootPath('src'),
      limit: false
    })
  }
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: [
      autoprefixer({
        browsers,
        remove: false
      }),
      cssMqpacker({
        sort: sortMediaqueries
      }),
      isProductionMode
        ? cssnano({
            zindex: false
          })
        : null
    ].filter(plugin => plugin !== null)
  }
};

const pugLoader = {
  loader: 'pug-plain-loader',
  options: {
    data: { ...globals }
  }
};

const config = {
  mode,

  entry: {
    main: './src/scripts/main.ts'
  },

  output: {
    filename: `scripts/[name]${isProductionMode ? '.[contenthash]' : ''}.js`,
    sourceMapFilename: `scripts/[name]${isProductionMode ? '.[contenthash]' : ''}.js.map`,
    path: rootPath('dist')
  },

  context: rootPath(),

  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['.ts', '.js', '.vue'],
    modules: [rootPath('node_modules')]
  },

  devtool: isProductionMode ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
    host: '0.0.0.0',
    port: 9000,
    open: false,
    hot: true
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [babelLoader, typescriptLoader]
      },
      {
        test: /\.styl(us)?$/,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['vue-style-loader', 'css-loader?sourceMap', postcssLoader, stylusLoader]
          },
          {
            use: ExtractTextPlugin.extract({
              use: ['css-loader?sourceMap', postcssLoader, stylusLoader]
            })
          }
        ]
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: [pugLoader]
          },
          {
            use: ['raw-loader', pugLoader]
          }
        ]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
      }
    ]
  },

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
    minimize: isProductionMode
  },

  plugins: [
    new webpack.DefinePlugin({
      ...Object.entries(globals).reduce((values, [key, value]) => {
        values[key] = JSON.stringify(value);
        return values;
      }, {})
    }),

    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/index.pug'
    }),

    new ExtractTextPlugin({
      filename: `styles/[name]${isProductionMode ? '.[md5:contenthash:hex:20]' : ''}.css`,
      allChunks: true
    }),

    new CleanWebpackPlugin(['dist'], {
      watch: true
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) return chunk.name;
      return webpack.util
        .createHash('md4')
        .update(
          Array.from(chunk._modules.values())
            .map(m => path.normalize(m.context, m.request))
            .join('_')
        )
        .digest('base64')
        .replace(/[^a-z0-9]+/gi, '');
    }),

    isProductionMode ? new webpack.HashedModuleIdsPlugin() : new webpack.NamedModulesPlugin(),

    isProductionMode ? null : new webpack.HotModuleReplacementPlugin()
  ].filter(plugin => plugin !== null),

  stats: {
    entrypoints: false,
    children: false,
    chunksSort: 'name',
    env: true,
    version: false,
    modules: false
  }
};

console.log(
  [
    chalk.dim('Mode:'),
    isProductionMode ? '👔' : '👷',
    chalk[isProductionMode ? 'cyan' : 'yellow'](mode)
  ].join(' ')
);

module.exports.default = config;
