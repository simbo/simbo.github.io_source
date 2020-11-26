const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  doctype: null,
  pretty: false,
  locals: {
    IS_PROD: isProd,
    VERSION: process.env.PACKAGE_VERSION,
    ABSPATH: isProd ? '//simbo.codes/' : '//localhost:1234/'
  }
};
