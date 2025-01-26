const webpack = require('webpack');

module.exports = function override(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "fs": false,
      "path": require.resolve("path-browserify"),
      "@xmldom/xmldom": false
    };
    return config;
  };