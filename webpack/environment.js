/**
 * Build mode
 */
const inProdMode = process.env && process.env.NODE_ENV === 'production';
const inDevMode = !inProdMode;
const mode = inProdMode ? 'production' : 'development';


/**
 * Globals for scripts, styles and templates
 * (only basic types)
 */
const globals = {
  // sets angular mode depending on build mode
  'process.env.NODE_ENV': mode
};


module.exports = {
  inProdMode,
  inDevMode,
  mode,
  globals
};
