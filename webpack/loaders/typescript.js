const { paths } = require('./../paths');


/**
 * Typescript Loader
 * https://github.com/s-panferov/awesome-typescript-loader
 */
const typescriptLoader = {
  loader: 'awesome-typescript-loader',
  options: {
    appendTsSuffixTo: [/\.vue$/]
  }
};


module.exports = {
  typescriptLoader
};
